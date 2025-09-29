import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

interface ActivityFile {
  storyId: string;
  activityGroup: string;
  activityNumber: string;
  language: string;
  filePath: string;
  fileName: string;
}

interface ExistingActivity {
  id: string;
  languages: Record<string, { pdfUrl: string; title: string; label: string; audioUrl?: string }>;
}

interface ProposedChange {
  type: 'new_activity' | 'add_language' | 'update_url';
  groupName: string;
  storyId: string;
  activityId: string;
  language: string;
  currentUrl?: string;
  proposedUrl: string;
  description: string;
  autoApply: boolean;
}

interface ChangeLog {
  timestamp: string;
  totalFilesScanned: number;
  newActivitiesAdded: number;
  languagesAdded: number;
  urlsUpdated: number;
  userDecisions: Array<{
    change: ProposedChange;
    decision: 'accepted' | 'rejected';
  }>;
}

// Enhanced language mapping
const LANGUAGE_MAP: Record<string, string> = {
  'E': 'en',
  'F': 'fr',
  'G': 'de',
  'S': 'svn',
  'SL': 'svn',
  'SVN': 'svn',
  'GR': 'gr',
  'It': 'it',
  'Lux': 'lux',
  'LD': 'ld'
};

const LANGUAGE_LABELS: Record<string, string> = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'svn': 'Slovenian',
  'gr': 'Greek',
  'it': 'Italian',
  'lux': 'Luxembourgish',
  'ld': 'Ladisch'
};

const ACTIVITY_GROUPS = ['PC', 'ELS', 'ICAU', 'LA'];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function debugLog(level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS', message: string, data?: any) {
  const icons = {
    INFO: '🔍',
    WARN: '⚠️',
    ERROR: '❌',
    SUCCESS: '✅'
  };
  
  console.log(`${icons[level]} [${level}] ${message}`);
  if (data) {
    console.log('   📊 Data:', JSON.stringify(data, null, 2));
  }
}

function scanActivitiesFolder(activitiesPath: string): ActivityFile[] {
  debugLog('INFO', `Starting scan of activities folder: ${activitiesPath}`);
  const activities: ActivityFile[] = [];
  
  if (!fs.existsSync(activitiesPath)) {
    debugLog('ERROR', `Activities folder not found: ${activitiesPath}`);
    return activities;
  }

  const storyFolders = fs.readdirSync(activitiesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name.startsWith('story'));

  debugLog('INFO', `Found story folders: ${storyFolders.join(', ')}`);

  for (const storyFolder of storyFolders) {
    const storyPath = path.join(activitiesPath, storyFolder);
    const storyId = storyFolder.replace('story', '');
    
    debugLog('INFO', `Processing ${storyFolder} (Story ID: ${storyId})`);

    const activityGroups = fs.readdirSync(storyPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => ACTIVITY_GROUPS.includes(name.toUpperCase()));

    debugLog('INFO', `Found activity groups in ${storyFolder}: ${activityGroups.join(', ')}`);

    for (const activityGroup of activityGroups) {
      const groupPath = path.join(storyPath, activityGroup);
      debugLog('INFO', `Scanning group: ${activityGroup} in ${storyFolder}`);
      
      const scanFolder = (folderPath: string, relativePath: string = '') => {
        const items = fs.readdirSync(folderPath, { withFileTypes: true });
        
        for (const item of items) {
          if (item.isDirectory()) {
            const subPath = path.join(folderPath, item.name);
            const newRelativePath = relativePath ? `${relativePath}/${item.name}` : item.name;
            scanFolder(subPath, newRelativePath);
          } else if (item.name.endsWith('.pdf')) {
            const fullRelativePath = relativePath ? `${relativePath}/${item.name}` : item.name;
            const webPath = `/activities/${storyFolder}/${activityGroup}/${fullRelativePath}`;
            
            debugLog('INFO', `Analyzing PDF file: ${item.name}`);
            
            // Enhanced regex patterns to match different naming conventions
            const patterns = [
              // Pattern 1: Story_1_PL_2_E.pdf
              /^Story[_\s]?(\d+)[_\s]([A-Z]+)[_\s](\d+)[_\s]([A-Z]{1,3})\.pdf$/i,
              // Pattern 2: Story1_PL_2_G.pdf
              /^Story(\d+)[_\s]([A-Z]+)[_\s](\d+)[_\s]([A-Z]{1,3})\.pdf$/i,
              // Pattern 3: Story 1_PL_2_F.pdf (with space)
              /^Story\s+(\d+)[_\s]([A-Z]+)[_\s](\d+)[_\s]([A-Z]{1,3})\.pdf$/i
            ];
            
            let match = null;
            let patternUsed = -1;
            
            for (let i = 0; i < patterns.length; i++) {
              match = item.name.match(patterns[i]);
              if (match) {
                patternUsed = i + 1;
                break;
              }
            }
            
            if (match) {
              const [, storyIdFromFile, activityType, activityNumber, langCode] = match;
              const language = LANGUAGE_MAP[langCode.toUpperCase()];
              
              debugLog('SUCCESS', `Matched file: ${item.name}`, {
                pattern: patternUsed,
                storyId: storyIdFromFile,
                activityType,
                activityNumber,
                langCode,
                mappedLanguage: language
              });
              
              // Verify story ID matches folder
              if (storyIdFromFile !== storyId) {
                debugLog('WARN', `Story ID mismatch: file says ${storyIdFromFile}, folder says ${storyId}`);
              }
              
              if (language) {
                activities.push({
                  storyId,
                  activityGroup: activityGroup.toUpperCase(),
                  activityNumber,
                  language,
                  filePath: webPath,
                  fileName: item.name
                });
              } else {
                debugLog('WARN', `Unknown language code: ${langCode} in file ${item.name}`);
              }
            } else {
              debugLog('WARN', `No matching pattern for file: ${item.name}`);
            }
          }
        }
      };
      
      scanFolder(groupPath);
    }
  }

  debugLog('SUCCESS', `Scan complete. Found ${activities.length} activity files`);
  return activities;
}

function parseExistingIndexFile(indexPath: string): string {
  debugLog('INFO', `Reading existing index file: ${indexPath}`);
  
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Index file not found: ${indexPath}`);
  }
  
  const content = fs.readFileSync(indexPath, 'utf-8');
  debugLog('SUCCESS', `Index file loaded. Size: ${content.length} characters`);
  return content;
}

function extractExistingActivities(content: string): Record<string, Record<string, ExistingActivity[]>> {
  debugLog('INFO', 'Extracting existing activities from index file');

  const out: Record<string, Record<string, ExistingActivity[]>> = {};
  ACTIVITY_GROUPS.forEach(g => (out[g] = {}));

  // --- tiny helpers ---------------------------------------------------------
  const findMatching = (src: string, openPos: number, open: string, close: string) => {
    // Robust scanner: ignores brackets inside strings and comments
    let depth = 0;
    let inS = false, inD = false, inT = false, inLine = false, inBlock = false;

    for (let i = openPos; i < src.length; i++) {
      const ch = src[i];
      const nx = src[i + 1];

      // Handle line comment
      if (inLine) {
        if (ch === '\n') inLine = false;
        continue;
      }

      // Handle block comment
      if (inBlock) {
        if (ch === '*' && nx === '/') { inBlock = false; i++; }
        continue;
      }

      // Handle strings
      if (inS) {
        if (ch === '\\') { i++; continue; }
        if (ch === '\'') inS = false;
        continue;
      }
      if (inD) {
        if (ch === '\\') { i++; continue; }
        if (ch === '"') inD = false;
        continue;
      }
      if (inT) {
        if (ch === '\\') { i++; continue; }
        if (ch === '`') inT = false;
        continue;
      }

      // Enter comments
      if (ch === '/' && nx === '/') { inLine = true; i++; continue; }
      if (ch === '/' && nx === '*') { inBlock = true; i++; continue; }

      // Enter strings
      if (ch === '\'') { inS = true; continue; }
      if (ch === '"')  { inD = true; continue; }
      if (ch === '`')  { inT = true; continue; }

      // Count brackets only when not in string/comment
      if (ch === open) {
        depth++;
      } else if (ch === close) {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  };

  const sliceBalancedBlock = (src: string, openPos: number) => {
    if (src[openPos] !== '{') {
      const next = src.indexOf('{', openPos);
      if (next === -1) throw new Error('Opening { not found.');
      openPos = next;
    }
    const end = findMatching(src, openPos, '{', '}');
    if (end < 0) throw new Error('Unbalanced { } while parsing.');
    return src.slice(openPos, end + 1);
  };

  const sliceBalancedArray = (src: string, openPos: number) => {
    if (src[openPos] !== '[') {
      const next = src.indexOf('[', openPos);
      if (next === -1) throw new Error('Opening [ not found.');
      openPos = next;
    }
    const end = findMatching(src, openPos, '[', ']');
    if (end < 0) throw new Error('Unbalanced [ ] while parsing.');
    return src.slice(openPos, end + 1);
  };
  // --------------------------------------------------------------------------

  // There are two constants named similarly (META and data). We want the one that actually contains stories.
  // Find all occurrences and pick the block that contains `stories: [`.
  const groupsDecl = Array.from(content.matchAll(/export\s+const\s+ACTIVITY_GROUPS\b[^=]*=\s*\{/g))
    .map(m => {
      const open = m.index! + m[0].lastIndexOf('{');
      const block = sliceBalancedBlock(content, open);
      return { open, block };
    })
    .find(x => /stories\s*:\s*\[/.test(x.block));

  if (!groupsDecl) {
    debugLog('ERROR', 'Could not locate ACTIVITY_GROUPS with stories.');
    return out;
  }

  const groupsBlock = groupsDecl.block;

  const groupKeys = ACTIVITY_GROUPS as string[]; // ["PC","ELS","ICAU","LA"]

  for (const key of groupKeys) {
    const keyMatch = new RegExp(`\\b${key}\\s*:\\s*\\{`, 'm').exec(groupsBlock);
    if (!keyMatch) {
      debugLog('WARN', `Group ${key} not found in index.ts`);
      continue;
    }
    const groupObj = sliceBalancedBlock(groupsBlock, keyMatch.index + keyMatch[0].lastIndexOf('{'));

    // find stories array inside the group
    const storiesHeader = /stories\s*:\s*\[/.exec(groupObj);
    if (!storiesHeader) {
      debugLog('WARN', `No stories[] for group ${key}`);
      continue;
    }
    const storiesArr = sliceBalancedArray(groupObj, storiesHeader.index + storiesHeader[0].lastIndexOf('['));

    // iterate story objects
    let cursor = 0;
    out[key] ||= {};
    while (true) {
      const openObj = storiesArr.indexOf('{', cursor);
      if (openObj === -1) break;
      const storyObj = sliceBalancedBlock(storiesArr, openObj);
      cursor = openObj + storyObj.length;

      // story id
      const storyIdMatch = /id\s*:\s*["'](\d+)["']/.exec(storyObj);
      if (!storyIdMatch) continue;
      const storyId = storyIdMatch[1];
      out[key][storyId] ||= [];

      // activities live anywhere inside the story (nested in sets: [ [ {…}, {…} ], … ])
      // We walk every activity object by finding `id: "activity-X-Y"` and then its `languages: { … }` block.
      let p = 0;
      while (true) {
        const idMatch = /id\s*:\s*["'](activity-\d+-\d+)["']/.exec(storyObj.slice(p));
        if (!idMatch) break;

        const idAbs = p + idMatch.index;
        const activityId = idMatch[1];

        // Find the nearest `languages:` that follows this id
        const langHeadRel = /languages\s*:\s*\{/.exec(storyObj.slice(idAbs));
        if (!langHeadRel) {
          // no languages block; still record the activity with empty languages
          out[key][storyId].push({ id: activityId, languages: {} });
          p = idAbs + idMatch[0].length;
          continue;
        }
        const langOpenAbs = idAbs + langHeadRel.index + langHeadRel[0].lastIndexOf('{');
        const languagesObj = sliceBalancedBlock(storyObj, langOpenAbs);

        // Parse language entries very lightly:  langCode: { pdfUrl: "…", title: "…", label: "…" }
        const languages: Record<string, { pdfUrl: string; title: string; label: string; audioUrl?: string }> = {};

        // Walk each `{ … }` value in the languages object
        let lp = 0;
        while (true) {
          const keyMatch2 = /([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*\{/.exec(languagesObj.slice(lp));
          if (!keyMatch2) break;
          const langKeyAbs = lp + keyMatch2.index;
          const code = keyMatch2[1];

          const langValObj = sliceBalancedBlock(languagesObj, langKeyAbs + keyMatch2[0].lastIndexOf('{'));

          const pdfUrl = /pdfUrl\s*:\s*["']([^"']*)["']/.exec(langValObj)?.[1] ?? '';
          const title = /title\s*:\s*["']([^"']*)["']/.exec(langValObj)?.[1] ?? '';
          const label = /label\s*:\s*["']([^"']*)["']/.exec(langValObj)?.[1] ?? code;
          const audioUrl = /audioUrl\s*:\s*["']([^"']*)["']/.exec(langValObj)?.[1];

          languages[code] = { pdfUrl, title, label, ...(audioUrl ? { audioUrl } : {}) };

          lp = langKeyAbs + langValObj.length;
        }

        out[key][storyId].push({ id: activityId, languages });
        p = idAbs + idMatch[0].length;
      }
    }
  }

  debugLog('SUCCESS', 'Finished extracting existing activities.');
  return out;
}


function generateNewActivityCode(storyId: string, activityNumber: string, files: ActivityFile[]): string {
  const activityId = `activity-${storyId}-${activityNumber}`;
  
  const languages = files.map(file => {
    return `              ${file.language}: {
                label: "${LANGUAGE_LABELS[file.language]}",
                title: "Activity ${activityNumber}",
                pdfUrl: "${file.filePath}"
              }`;
  }).join(',\n');

  return `            {
              id: "${activityId}",
              description: "Activity ${activityNumber}",
              languages: {
${languages}
              }
            }`;
}

function findInsertionPoint(content: string, groupName: string, storyId: string): number {
  // Find the specific story's activities section
  const groupPattern = new RegExp(
    `${groupName}:\\s*\\{[\\s\\S]*?stories:\\s*\\[[\\s\\S]*?\\{\\s*id:\\s*"${storyId}"[\\s\\S]*?sets:\\s*\\[\\s*\\[([\\s\\S]*?)\\]\\s*\\]`,
    'g'
  );
  
  const match = groupPattern.exec(content);
  if (match) {
    const activitiesSection = match[1];
    const activitiesStart = match.index + match[0].indexOf(activitiesSection);
    return activitiesStart + activitiesSection.length;
  }
  
  return -1;
}

function addActivityToIndex(content: string, groupName: string, storyId: string, newActivityCode: string): string {
  debugLog('INFO', `Adding new activity to ${groupName}, Story ${storyId}`);

  if (!content.includes(`${groupName}:`)) {
    debugLog('ERROR', `Group ${groupName} not found in content`);
    return content;
  }

  const groupPattern = new RegExp(
    `(${groupName}\\s*:\\s*\\{[\\s\\S]*?stories\\s*:\\s*\\[)([\\s\\S]*?)(\\]\\s*\\}(?=\\s*(?:,\\s*)?(?:[A-Z]+\\s*:|\\}|$)))`,
    'g'
  );

  let modified = false;

  const result = content.replace(groupPattern, (match, prefix, storiesContentOrig, suffix) => {
    // Local, non-shared storyPattern to avoid lastIndex issues
    const storyPatternLocal = new RegExp(
      `(\\{[\\s\\S]*?id\\s*:\\s*"${storyId}"[\\s\\S]*?sets\\s*:\\s*\\[\\s*\\[)([\\s\\S]*?)(\\]\\s*\\][\\s\\S]*?\\})`
    );

    const updatedStoriesContent = storiesContentOrig.replace(
      storyPatternLocal,
      (storyMatchStr: string, storyPrefix: string, activitiesContent: string, storySuffix: string): string => {
        // Insert INSIDE the inner activities array, i.e. after the last '}' and BEFORE the closing ']'
        const cleanActivities = activitiesContent.trim();
        // This line calculates the separator to keep syntax correct:
        const sep = cleanActivities.length > 0 ? (cleanActivities.endsWith(',') ? '\n' : ',\n') : '';

        modified = true;
        debugLog('SUCCESS', `Inserted new activity inside inner activities array for ${groupName}, Story ${storyId}`);
        // Insert before the closing ']]' held in storySuffix:
        return `${storyPrefix}${activitiesContent}${sep}${newActivityCode}${storySuffix}`;
      }
    );

    return `${prefix}${updatedStoriesContent}${suffix}`;
  });

  if (!modified) {
    debugLog('ERROR', `Failed to insert activity into ${groupName}, Story ${storyId} - no modifications made`);
    return content;
  }

  debugLog('INFO', `Content length change: ${content.length} -> ${result.length} (${result.length - content.length} chars)`);
  return result;
}

// Add this manual insertion function as backup
function addActivityToIndexManual(content: string, groupName: string, storyId: string, newActivityCode: string): string {
  debugLog('INFO', `Manual insertion: Adding activity to ${groupName}, Story ${storyId}`);
  
  // Find the group start
  const groupStart = content.indexOf(`${groupName}:`);
  if (groupStart === -1) {
    debugLog('ERROR', `Group ${groupName} not found`);
    return content;
  }
  
  // Find the stories array for this group
  const storiesStart = content.indexOf('stories:', groupStart);
  if (storiesStart === -1) {
    debugLog('ERROR', `Stories array not found for group ${groupName}`);
    return content;
  }
  
  // Find the specific story
  const storyMarker = `id: "${storyId}"`;
  const storyStart = content.indexOf(storyMarker, storiesStart);
  if (storyStart === -1) {
    debugLog('ERROR', `Story ${storyId} not found in group ${groupName}`);
    return content;
  }
  
  // Find the sets array for this story
  const setsStart = content.indexOf('sets:', storyStart);
  if (setsStart === -1) {
    debugLog('ERROR', `Sets array not found for story ${storyId}`);
    return content;
  }
  
  // Find the activities array (first [ after sets:)
  const setsArrayStart = content.indexOf('[', setsStart + 1);
  const activitiesArrayStart = content.indexOf('[', setsArrayStart + 1);
  
  if (activitiesArrayStart === -1) {
    debugLog('ERROR', `Activities array not found for story ${storyId}`);
    return content;
  }
  
  // Find the closing bracket for the activities array
  let bracketCount = 1;
  let pos = activitiesArrayStart + 1;
  
  while (bracketCount > 0 && pos < content.length) {
    if (content[pos] === '[') {
      bracketCount++;
    } else if (content[pos] === ']') {
      bracketCount--;
    }
    pos++;
  }

  if (bracketCount > 0) {
    debugLog('ERROR', `Could not find end of activities array for story ${storyId}`);
    return content;
  }

  const activitiesEnd = pos - 1; // Position of closing ]
  
  // Get the current activities content
  const activitiesContent = content.substring(activitiesArrayStart + 1, activitiesEnd);
  const trimmedActivities = activitiesContent.trim();
  
  debugLog('INFO', `Found activities section, length: ${activitiesContent.length}`);
  
  // Determine separator
  let separator = '},';
  if (trimmedActivities.length > 0) {
    if (!trimmedActivities.endsWith(',')) {
      separator = ',\n';
    } else {
      separator = '\n';
    }
  }
  
  // Insert the new activity
  // Insert the new activity INSIDE the inner array (right after the last '}', BEFORE ']')
  const absoluteInsertPos = activitiesEnd; // <-- CHANGED: was activitiesEnd + 1
  const indent = '                    ';
  const toInsert = `${separator}${newActivityCode}`;

  const newContent = 
    content.substring(0, absoluteInsertPos) + 
    toInsert + 
    content.substring(absoluteInsertPos);

  debugLog('SUCCESS', `Manual insertion (new set) completed for ${groupName}, Story ${storyId}`);
  debugLog('INFO', `Content length change: ${content.length} -> ${newContent.length}`);

  return newContent;
}

function updateLanguageInActivity(
  content: string, 
  groupName: string, 
  storyId: string, 
  activityId: string, 
  language: string, 
  newUrl: string
): string {
  debugLog('INFO', `Updating language ${language} in ${groupName}, Story ${storyId}, Activity ${activityId}`);

  // Find the activity block first (keep your existing way to narrow down to the activity)
  const activityBlockRe = new RegExp(
    `${groupName}\\s*:[\\s\\S]*?id\\s*:\\s*"${storyId}"[\\s\\S]*?\\{[\\s\\S]*?id\\s*:\\s*"${activityId}"[\\s\\S]*?languages\\s*:\\s*\\{`,
    'm'
  );
  const actStart = content.search(activityBlockRe);
  if (actStart < 0) {
    debugLog('ERROR', `Activity block not found for ${activityId}`);
    return content;
  }

  // Find the exact languages object span with a balanced scanner
  const langKeyIdx = content.indexOf('languages', actStart);
  const langObjOpen = content.indexOf('{', langKeyIdx); // opening '{' of languages
  if (langObjOpen < 0) {
    debugLog('ERROR', `languages object not found for ${activityId}`);
    return content;
  }

  // Balanced scan for the matching '}' of the languages object
  const langObjClose = (() => {
    let depth = 0;
    for (let i = langObjOpen; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  })();

  if (langObjClose < 0) {
    debugLog('ERROR', `Unbalanced languages object for ${activityId}`);
    return content;
  }

  const before = content.slice(0, langObjOpen + 1);          // after '{'
  const inside = content.slice(langObjOpen + 1, langObjClose);
  const after  = content.slice(langObjClose);                 // from closing '}' onward

  // If language exists, replace its pdfUrl; if not, append a new sibling entry
  const langKeyRe = new RegExp(`(^|\\n)\\s*${language}\\s*:\\s*\\{`, 'm');
  let newInside = inside;

  if (langKeyRe.test(inside)) {
    // Update existing language's pdfUrl only (keep other fields)
    newInside = inside.replace(
      new RegExp(`(\\n\\s*${language}\\s*:\\s*\\{[\\s\\S]*?pdfUrl\\s*:\\s*")(.*?)(")`, 'm'),
      `$1${newUrl}$3`
    );
    debugLog('SUCCESS', `Updated existing language ${language}`);
  } else {
    // Build new language entry
    const indentBase = (inside.match(/\n(\s*)\S/)?.[1] ?? '                '); // guess from current indentation
    const entry = `${indentBase}${language}: {
${indentBase}  label: "${LANGUAGE_LABELS?.[language] ?? language}",
${indentBase}  title: "Activity",
${indentBase}  pdfUrl: "${newUrl}"
${indentBase}}`;

    // Decide if a comma is needed before appending
    const trimmed = inside.replace(/\s+$/,'');
    const needsComma = /\S/.test(trimmed) && !/,\s*$/.test(trimmed);
    newInside = trimmed + (needsComma ? ',' : '') + '\n' + entry + '\n';
    debugLog('SUCCESS', `Added new language ${language}`);
  }

  // IMPORTANT: insertion position calculation
  // We now insert right BEFORE the closing brace of languages.
  // This is the line that sets the insertion point:
  // insertPos = langObjClose (so we rebuild using before + newInside + after)
  // CHANGED: previously, code ended up inserting inside the last language object.
  const result = before + newInside + after;

  return content.slice(0, langObjOpen + 1) + newInside + content.slice(langObjClose);
}

async function handleProposedChanges(proposedChanges: ProposedChange[]): Promise<ProposedChange[]> {
  const acceptedChanges: ProposedChange[] = [];
  const manualChanges = proposedChanges.filter(change => !change.autoApply);
  const autoChanges = proposedChanges.filter(change => change.autoApply);
  
  // Auto-apply changes for new activities and languages
  if (autoChanges.length > 0) {
    debugLog('INFO', `Auto-applying ${autoChanges.length} changes (new activities/languages)`);
    acceptedChanges.push(...autoChanges);
  }
  
  if (manualChanges.length === 0) {
    return acceptedChanges;
  }

  console.log('\n🔄 URL CONFLICTS DETECTED - Manual Review Required');
  console.log('==================================================');
  
  for (let i = 0; i < manualChanges.length; i++) {
    const change = manualChanges[i];
    
    console.log(`\n--- Conflict ${i + 1}/${manualChanges.length} ---`);
    console.log(`📍 Location: ${change.groupName} > Story ${change.storyId} > ${change.activityId} > ${change.language}`);
    console.log(`📝 Description: ${change.description}`);
    console.log(`📤 Current URL:  ${change.currentUrl}`);
    console.log(`📥 Proposed URL: ${change.proposedUrl}`);
    
    // Show the difference
    if (change.currentUrl && change.proposedUrl) {
      const currentParts = change.currentUrl.split('/');
      const proposedParts = change.proposedUrl.split('/');
      
      console.log('\n🔍 URL Comparison:');
      for (let j = 0; j < Math.max(currentParts.length, proposedParts.length); j++) {
        const current = currentParts[j] || '(missing)';
        const proposed = proposedParts[j] || '(missing)';
        
        if (current !== proposed) {
          console.log(`   Part ${j + 1}: "${current}" → "${proposed}" ⚠️`);
        } else {
          console.log(`   Part ${j + 1}: "${current}" ✓`);
        }
      }
    }
    
    const choice = await askQuestion('\nUpdate this URL? (y/n): ');
    if (choice.toLowerCase().startsWith('y')) {
      acceptedChanges.push(change);
      debugLog('SUCCESS', 'Change accepted by user');
    } else {
      debugLog('INFO', 'Change rejected by user');
    }
  }
  
  return acceptedChanges;
}

async function generateUpdatedIndex(
  originalContent: string, 
  scannedActivities: ActivityFile[],
  existingActivities: Record<string, Record<string, ExistingActivity[]>>
): Promise<{ content: string; log: ChangeLog }> {
  debugLog('INFO', 'Starting index generation process');
  
  let updatedContent = originalContent;
  const changeLog: ChangeLog = {
    timestamp: new Date().toISOString(),
    totalFilesScanned: scannedActivities.length,
    newActivitiesAdded: 0,
    languagesAdded: 0,
    urlsUpdated: 0,
    userDecisions: []
  };
  
  // Group scanned activities
  const groupedActivities: Record<string, Record<string, Record<string, ActivityFile[]>>> = {};
  
  for (const activity of scannedActivities) {
    if (!groupedActivities[activity.activityGroup]) {
      groupedActivities[activity.activityGroup] = {};
    }
    if (!groupedActivities[activity.activityGroup][activity.storyId]) {
      groupedActivities[activity.activityGroup][activity.storyId] = {};
    }
    if (!groupedActivities[activity.activityGroup][activity.storyId][activity.activityNumber]) {
      groupedActivities[activity.activityGroup][activity.storyId][activity.activityNumber] = [];
    }
    
    groupedActivities[activity.activityGroup][activity.storyId][activity.activityNumber].push(activity);
  }

  const proposedChanges: ProposedChange[] = [];
  
  // Process each group
  for (const [groupName, stories] of Object.entries(groupedActivities)) {
    debugLog('INFO', `Processing group: ${groupName}`);
    
    for (const [storyId, activities] of Object.entries(stories)) {
      debugLog('INFO', `Processing story: ${storyId} in group ${groupName}`);
      
      for (const [activityNumber, files] of Object.entries(activities)) {
        const activityId = `activity-${storyId}-${activityNumber}`;
        
        const existingStoryActivities = existingActivities[groupName]?.[storyId] || [];
        const existingActivity = existingStoryActivities.find(a => a.id === activityId);
        
        if (!existingActivity) {
          // New activity - auto-add
          debugLog('SUCCESS', `Found new activity: ${activityId} in ${groupName}`);
          
          proposedChanges.push({
            type: 'new_activity',
            groupName,
            storyId,
            activityId,
            language: 'multiple',
            proposedUrl: files.map(f => f.filePath).join(', '),
            description: `Add new activity ${activityId} to ${groupName}/Story ${storyId}`,
            autoApply: true
          });
        } else {
          // Check existing activity for changes
          for (const file of files) {
            const existingLang = existingActivity.languages[file.language];
            
            if (!existingLang) {
              // New language - auto-add
              proposedChanges.push({
                type: 'add_language',
                groupName,
                storyId,
                activityId,
                language: file.language,
                proposedUrl: file.filePath,
                description: `Add missing language '${file.language}' to ${activityId}`,
                autoApply: true
              });
            } else if (existingLang.pdfUrl !== file.filePath) {
              // URL difference - manual review
              proposedChanges.push({
                type: 'update_url',
                groupName,
                storyId,
                activityId,
                language: file.language,
                currentUrl: existingLang.pdfUrl,
                proposedUrl: file.filePath,
                description: `URL mismatch for ${activityId} (${file.language})`,
                autoApply: false
              });
            }
          }
        }
      }
    }
  }

  debugLog('INFO', `Found ${proposedChanges.length} total changes to process`);
  
  // Handle proposed changes
  const acceptedChanges = await handleProposedChanges(proposedChanges);
  
  // Apply accepted changes
  for (const change of acceptedChanges) {
    if (change.type === 'new_activity') {
      const files = groupedActivities[change.groupName][change.storyId][change.activityId.split('-')[2]];
      const newActivityCode = generateNewActivityCode(change.storyId, change.activityId.split('-')[2], files);

      const beforeLength = updatedContent.length;

      // 1) try regex-based (inserts as a NEW set after inner ])
      updatedContent = addActivityToIndex(updatedContent, change.groupName, change.storyId, newActivityCode);

      // 2) fallback to manual insertion if regex made no change
      if (updatedContent.length === beforeLength) {
        debugLog('WARN', 'Regex insertion failed, trying manual insertion');
        updatedContent = addActivityToIndexManual(updatedContent, change.groupName, change.storyId, newActivityCode);
      }

      if (updatedContent.length > beforeLength) {
        changeLog.newActivitiesAdded++;
        debugLog('SUCCESS', `Activity successfully added to ${change.groupName}, Story ${change.storyId}`);
      } else {
        debugLog('ERROR', `Failed to add activity to ${change.groupName}, Story ${change.storyId}`);
      }
    } else if (change.type === 'add_language') {
      updatedContent = updateLanguageInActivity(
        updatedContent,
        change.groupName,
        change.storyId,
        change.activityId,
        change.language,
        change.proposedUrl
      );
      changeLog.languagesAdded++;
    } else if (change.type === 'update_url') {
      updatedContent = updateLanguageInActivity(
        updatedContent,
        change.groupName,
        change.storyId,
        change.activityId,
        change.language,
        change.proposedUrl
      );
      changeLog.urlsUpdated++;
    }
    
    debugLog('SUCCESS', `Applied change: ${change.description}`);
  }

  // Log user decisions
  for (const change of proposedChanges) {
    if (!change.autoApply) {
      changeLog.userDecisions.push({
        change,
        decision: acceptedChanges.includes(change) ? 'accepted' : 'rejected'
      });
    }
  }

  debugLog('SUCCESS', 'Index generation complete');
  
  return { content: updatedContent, log: changeLog };
}

function writeResults(outputPath: string, content: string, changeLog: ChangeLog) {
  debugLog('INFO', `Writing updated index to: ${outputPath}`);
  
  // Write updated index file
  fs.writeFileSync(outputPath, content);
  
  // Write change log
  const logPath = outputPath.replace('.ts', '-changes.json');
  fs.writeFileSync(logPath, JSON.stringify(changeLog, null, 2));
  
  // Verify file was written correctly
  const writtenContent = fs.readFileSync(outputPath, 'utf-8');
  if (writtenContent === content) {
    debugLog('SUCCESS', 'File write verification successful');
  } else {
    debugLog('ERROR', 'File write verification failed');
  }
  
  // Print summary
  console.log('\n📊 FINAL SUMMARY');
  console.log('================');
  console.log(`📄 Files scanned: ${changeLog.totalFilesScanned}`);
  console.log(`🆕 New activities added: ${changeLog.newActivitiesAdded}`);
  console.log(`🌐 Languages added: ${changeLog.languagesAdded}`);
  console.log(`🔄 URLs updated: ${changeLog.urlsUpdated}`);
  console.log(`👤 User decisions: ${changeLog.userDecisions.length}`);
  console.log(`📝 Updated file: ${outputPath}`);
  console.log(`📋 Change log: ${logPath}`);
}

function formatError(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}\n${err.stack ?? ''}`;
  try { return JSON.stringify(err); } catch { return String(err); }
}

async function main() {
  try {
    const projectRoot = process.cwd();
    const activitiesPath = path.join(projectRoot, 'public', 'activities');
    const indexPath = path.join(projectRoot, 'data', 'index.ts');
    const outputPath = path.join(projectRoot, 'data', 'index-updated.ts');

    debugLog('INFO', 'Starting activity sync process');
    debugLog('INFO', `Project root: ${projectRoot}`);
    debugLog('INFO', `Activities path: ${activitiesPath}`);
    debugLog('INFO', `Index path: ${indexPath}`);
    debugLog('INFO', `Output path: ${outputPath}`);

    // Step 1: Scan activities folder
    const scannedActivities = scanActivitiesFolder(activitiesPath);
    
    if (scannedActivities.length === 0) {
      debugLog('WARN', 'No activities found. Exiting.');
      rl.close();
      return;
    }

    // Step 2: Parse existing index
    const originalContent = parseExistingIndexFile(indexPath);
    const existingActivities = extractExistingActivities(originalContent);

    // Step 3: Generate updated index
    const { content: updatedContent, log: changeLog } = await generateUpdatedIndex(
      originalContent, 
      scannedActivities, 
      existingActivities
    );

    // Step 4: Write results
    writeResults(outputPath, updatedContent, changeLog);

    debugLog('SUCCESS', 'Activity sync process completed successfully');
    
  } catch (err) {
    debugLog('ERROR', 'Activity sync process failed', formatError(err));
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}