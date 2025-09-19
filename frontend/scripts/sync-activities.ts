import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

interface ActivityFile {
  storyId: string;
  activityGroup: string;
  activityNumber: string;
  language: string;
  filePath: string;
}

interface ExistingActivity {
  id: string;
  languages: Record<string, { pdfUrl: string; title: string; label: string; audioUrl?: string }>;
}

interface ProposedChange {
  type: 'update_url' | 'add_language';
  groupName: string;
  storyId: string;
  activityId: string;
  language: string;
  currentUrl?: string;
  proposedUrl: string;
  description: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  'E': 'en',
  'F': 'fr', 
  'G': 'de',
  'S': 'svn',
  'GR': 'gr',
  'It': 'it',
  'Lux': 'lux'
};

const LANGUAGE_LABELS: Record<string, string> = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'svn': 'Slovenian',
  'gr': 'Greek',
  'it': 'Italian',
  'lux': 'Luxembourgish'
};

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function scanActivitiesFolder(activitiesPath: string): ActivityFile[] {
  const activities: ActivityFile[] = [];
  
  if (!fs.existsSync(activitiesPath)) {
    console.error(`Activities folder not found: ${activitiesPath}`);
    return activities;
  }

  const storyFolders = fs.readdirSync(activitiesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name.startsWith('story'));

  for (const storyFolder of storyFolders) {
    const storyPath = path.join(activitiesPath, storyFolder);
    const storyId = storyFolder.replace('story', '');
    
    const activityGroups = fs.readdirSync(storyPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const activityGroup of activityGroups) {
      const groupPath = path.join(storyPath, activityGroup);
      
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
            
            console.log(`📄 Checking file: ${item.name} in ${activityGroup}`); // Add this debug line
            
            const match = item.name.match(/Story[_\s]?(\d+)[_\s](\w+)[_\s](\d+)[_\s]([A-Z]{1,3})\.pdf/i);
            if (match) {
              const [, , , activityNumber, langCode] = match;
              const language = LANGUAGE_MAP[langCode.toUpperCase()];
              
              console.log(`🔍 Matched: ${item.name} -> Story: ${storyId}, Group: ${activityGroup}, Activity: ${activityNumber}, LangCode: ${langCode}, Language: ${language}`); // Add this debug line
              
              if (language) {
                activities.push({
                  storyId,
                  activityGroup: activityGroup.toUpperCase(),
                  activityNumber,
                  language,
                  filePath: webPath
                });
              } else {
                console.log(`⚠️  Unknown language code: ${langCode} in file ${item.name}`); // Add this debug line
              }
            } else {
              console.log(`❌ No match for file: ${item.name}`); // Add this debug line
            }
          }
        }
      };
      
      scanFolder(groupPath);
    }
  }

  return activities;
}

function parseExistingIndexFile(indexPath: string): string {
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Index file not found: ${indexPath}`);
  }
  
  return fs.readFileSync(indexPath, 'utf-8');
}

function extractExistingActivities(content: string): Record<string, Record<string, ExistingActivity[]>> {
  const existing: Record<string, Record<string, ExistingActivity[]>> = {};
  
  // Initialize all groups
  ['PC', 'ELS', 'ICAU', 'LA'].forEach(group => {
    existing[group] = {};
  });
  
  // Extract each activity group section with proper boundaries
  const groupRegex = /(PC|ELS|ICAU|LA):\s*\{\s*stories:\s*\[([\s\S]*?)\]\s*\}(?=\s*,?\s*(?:PC|ELS|ICAU|LA|};))/g;
  let groupMatch;
  
  while ((groupMatch = groupRegex.exec(content)) !== null) {
    const groupName = groupMatch[1];
    const storiesSection = groupMatch[2];
    
    existing[groupName] = {};
    
    // Extract each story with proper boundaries
    const storyRegex = /\{\s*id:\s*"(\d+)"[\s\S]*?sets:\s*\[\s*\[([\s\S]*?)\]\s*\]\s*\}/g;
    let storyMatch;
    
    while ((storyMatch = storyRegex.exec(storiesSection)) !== null) {
      const storyId = storyMatch[1];
      const activitiesSection = storyMatch[2];
      
      existing[groupName][storyId] = [];
      
      // Extract activities with proper boundaries
      const activityRegex = /\{\s*id:\s*"(activity-\d+-\d+)"[\s\S]*?languages:\s*\{([\s\S]*?)\}\s*(?:,\s*)?\}/g;
      let activityMatch;
      
      while ((activityMatch = activityRegex.exec(activitiesSection)) !== null) {
        const activityId = activityMatch[1];
        const languagesSection = activityMatch[2];
        
        const languages: Record<string, any> = {};
        
        // Extract language entries with proper boundaries
        const langRegex = /(\w+):\s*\{[^}]*?pdfUrl:\s*"([^"]+)"[^}]*?\}/g;
        let langMatch;
        
        while ((langMatch = langRegex.exec(languagesSection)) !== null) {
          const lang = langMatch[1];
          const pdfUrl = langMatch[2];
          languages[lang] = { 
            pdfUrl,
            title: "Activity",
            label: LANGUAGE_LABELS[lang] || lang
          };
        }
        
        existing[groupName][storyId].push({
          id: activityId,
          languages
        });
      }
    }
  }
  
  return existing;
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

function findStoryInGroup(content: string, groupName: string, storyId: string): { found: boolean; position: number } {
  // Look for the specific story within the specific group
  const groupPattern = new RegExp(
    `${groupName}:\\s*\\{[\\s\\S]*?stories:\\s*\\[([\\s\\S]*?)\\]\\s*\\}`,
    'g'
  );
  
  const groupMatch = groupPattern.exec(content);
  if (!groupMatch) {
    return { found: false, position: -1 };
  }
  
  const storiesSection = groupMatch[1];
  const storyPattern = new RegExp(`\\{\\s*id:\\s*"${storyId}"[\\s\\S]*?\\}`);
  
  return {
    found: storyPattern.test(storiesSection),
    position: groupMatch.index + groupMatch[0].indexOf(storiesSection)
  };
}

function addActivityToIndex(content: string, groupName: string, storyId: string, newActivityCode: string): string {
  // Find the exact group and story
  const groupPattern = new RegExp(
    `(${groupName}:\\s*\\{[\\s\\S]*?stories:\\s*\\[)([\\s\\S]*?)(\\]\\s*\\})`,
    'g'
  );
  
  return content.replace(groupPattern, (match, prefix, storiesContent, suffix) => {
    // Look for the specific story within this group
    const storyPattern = new RegExp(
      `(\\{\\s*id:\\s*"${storyId}"[\\s\\S]*?sets:\\s*\\[\\s*\\[)([\\s\\S]*?)(\\]\\s*\\]\\s*\\})`,
      'g'
    );
    
    interface StoryPatternMatch {
      storyPrefix: string;
      activitiesContent: string;
      storySuffix: string;
    }

    interface ActivitySeparator {
      separator: string;
    }

    const updatedStoriesContent: string = storiesContent.replace(
      storyPattern, 
      (storyMatch: string, storyPrefix: string, activitiesContent: string, storySuffix: string): string => {
        // Clean up existing activities content
        const cleanActivities: string = activitiesContent.trim();
        let separator: string = '';
        
        if (cleanActivities && cleanActivities.length > 0) {
          // Add comma if there are existing activities and the last one doesn't end with a comma
          if (!cleanActivities.endsWith(',')) {
            separator = ',\n';
          } else {
            separator = '\n';
          }
        }
        
        return `${storyPrefix}${activitiesContent}${separator}${newActivityCode}${storySuffix}`;
      }
    );
    
    return `${prefix}${updatedStoriesContent}${suffix}`;
  });
}

function updateLanguageInActivity(
  content: string, 
  groupName: string, 
  storyId: string, 
  activityId: string, 
  language: string, 
  newUrl: string
): string {
  // Find the specific group, story, and activity
  const groupPattern = new RegExp(
    `(${groupName}:[\\s\\S]*?)\\{\\s*id:\\s*"${storyId}"([\\s\\S]*?)\\{\\s*id:\\s*"${activityId}"([\\s\\S]*?)languages:\\s*\\{([\\s\\S]*?)\\}([\\s\\S]*?)\\}`,
    'g'
  );
  
  return content.replace(groupPattern, (match, beforeGroup, afterStoryId, afterActivityId, languagesSection, afterLanguages) => {
    const langPattern = new RegExp(
      `(\\s*${language}:\\s*\\{[\\s\\S]*?pdfUrl:\\s*")([^"]+)("[\\s\\S]*?\\})`,
      'g'
    );
    
    if (langPattern.test(languagesSection)) {
      // Update existing language
      const updatedLanguages = languagesSection.replace(langPattern, `$1${newUrl}$3`);
      return `${beforeGroup}{
        id: "${storyId}"${afterStoryId}{
        id: "${activityId}"${afterActivityId}languages: {${updatedLanguages}}${afterLanguages}}`;
    } else {
      // Add new language
      const newLanguageCode = `              ${language}: {
                label: "${LANGUAGE_LABELS[language]}",
                title: "Activity",
                pdfUrl: "${newUrl}"
              }`;
      
      const cleanLanguagesSection = languagesSection.trim();
      let separator = '';
      
      if (cleanLanguagesSection && cleanLanguagesSection.length > 0) {
        if (!cleanLanguagesSection.endsWith(',')) {
          separator = ',\n';
        } else {
          separator = '\n';
        }
      }
      
      const updatedLanguages = `${languagesSection}${separator}${newLanguageCode}`;
      return `${beforeGroup}{
        id: "${storyId}"${afterStoryId}{
        id: "${activityId}"${afterActivityId}languages: {${updatedLanguages}}${afterLanguages}}`;
    }
  });
}

async function handleProposedChanges(proposedChanges: ProposedChange[]): Promise<ProposedChange[]> {
  const acceptedChanges: ProposedChange[] = [];
  
  if (proposedChanges.length === 0) {
    return acceptedChanges;
  }

  console.log('\n🔄 PROPOSED CHANGES:');
  console.log('====================');
  
  for (let i = 0; i < proposedChanges.length; i++) {
    const change = proposedChanges[i];
    console.log(`\n${i + 1}. ${change.description}`);
    console.log(`   Group: ${change.groupName}, Story: ${change.storyId}, Activity: ${change.activityId}`);
    console.log(`   Language: ${change.language}`);
    
    if (change.currentUrl) {
      console.log(`   Current URL: ${change.currentUrl}`);
    }
    console.log(`   Proposed URL: ${change.proposedUrl}`);
  }
  
  console.log('\nOptions:');
  console.log('1. Accept all changes');
  console.log('2. Reject all changes');
  console.log('3. Review each change individually');
  
  const overallChoice = await askQuestion('\nChoose an option (1-3): ');
  
  switch (overallChoice.trim()) {
    case '1':
      return proposedChanges;
    
    case '2':
      return [];
    
    case '3':
      for (let i = 0; i < proposedChanges.length; i++) {
        const change = proposedChanges[i];
        console.log(`\n--- Change ${i + 1}/${proposedChanges.length} ---`);
        console.log(change.description);
        console.log(`Proposed URL: ${change.proposedUrl}`);
        
        const individualChoice = await askQuestion('Accept this change? (y/n): ');
        if (individualChoice.toLowerCase().startsWith('y')) {
          acceptedChanges.push(change);
        }
      }
      return acceptedChanges;
    
    default:
      console.log('Invalid choice. Rejecting all changes.');
      return [];
  }
}

async function generateUpdatedIndex(
  originalContent: string, 
  scannedActivities: ActivityFile[],
  existingActivities: Record<string, Record<string, ExistingActivity[]>>
): Promise<string> {
  let updatedContent = originalContent;
  
  // Group scanned activities by activity group, then by story, then by activity number
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
  
  // Process each group separately to prevent cross-contamination
  for (const [groupName, stories] of Object.entries(groupedActivities)) {
    console.log(`\n📂 Processing group: ${groupName}`);
    
    for (const [storyId, activities] of Object.entries(stories)) {
      console.log(`  📖 Processing story: ${storyId}`);
      
      for (const [activityNumber, files] of Object.entries(activities)) {
        const activityId = `activity-${storyId}-${activityNumber}`;
        
        // Only look for existing activities in the SAME group
        const existingStoryActivities = existingActivities[groupName]?.[storyId] || [];
        const existingActivity = existingStoryActivities.find(a => a.id === activityId);
        
        if (!existingActivity) {
          // Activity doesn't exist in this group - add it
          console.log(`    ➕ Adding new activity: ${activityId} to ${groupName}`);
          const newActivityCode = generateNewActivityCode(storyId, activityNumber, files);
          updatedContent = addActivityToIndex(updatedContent, groupName, storyId, newActivityCode);
        } else {
          // Activity exists - check for missing languages or different URLs
          console.log(`    🔍 Checking existing activity: ${activityId} in ${groupName}`);
          
          for (const file of files) {
            const existingLang = existingActivity.languages[file.language];
            
            if (!existingLang) {
              proposedChanges.push({
                type: 'add_language',
                groupName,
                storyId,
                activityId,
                language: file.language,
                proposedUrl: file.filePath,
                description: `Add missing language '${file.language}' to ${activityId} in ${groupName}`
              });
            } else if (existingLang.pdfUrl !== file.filePath) {
              proposedChanges.push({
                type: 'update_url',
                groupName,
                storyId,
                activityId,
                language: file.language,
                currentUrl: existingLang.pdfUrl,
                proposedUrl: file.filePath,
                description: `Update URL for ${activityId} (${file.language}) in ${groupName}`
              });
            }
          }
        }
      }
    }
  }

  // Handle proposed changes interactively
  const acceptedChanges = await handleProposedChanges(proposedChanges);
  
  // Apply accepted changes
  for (const change of acceptedChanges) {
    updatedContent = updateLanguageInActivity(
      updatedContent,
      change.groupName,
      change.storyId,
      change.activityId,
      change.language,
      change.proposedUrl
    );
    console.log(`✅ Applied change: ${change.description}`);
  }

  if (acceptedChanges.length === 0 && Object.keys(groupedActivities).length === 0) {
    console.log('\n✅ No changes needed - all activities are up to date!');
  }

  return updatedContent;
}

async function main() {
  const projectRoot = process.cwd();
  const activitiesPath = path.join(projectRoot, 'public', 'activities');
  const indexPath = path.join(projectRoot, 'data', 'index.ts');
  const outputPath = path.join(projectRoot, 'data', 'index-updated.ts');

  console.log('🔍 Scanning activities folder...');
  const scannedActivities = scanActivitiesFolder(activitiesPath);
  console.log(`Found ${scannedActivities.length} activity files`);

  console.log('\n📖 Parsing existing index.ts...');
  const originalContent = parseExistingIndexFile(indexPath);
  const existingActivities = extractExistingActivities(originalContent);
  
  // Debug: Show what was found
  console.log('\n🔍 Found existing activities:');
  for (const [group, stories] of Object.entries(existingActivities)) {
    console.log(`  ${group}: ${Object.keys(stories).length} stories`);
    for (const [storyId, activities] of Object.entries(stories)) {
      console.log(`    Story ${storyId}: ${activities.length} activities`);
    }
  }

  console.log('\n🔄 Analyzing and updating...');
  const updatedContent = await generateUpdatedIndex(originalContent, scannedActivities, existingActivities);

  // Write updated file
  fs.writeFileSync(outputPath, updatedContent);
  console.log(`\n📝 Updated index written to: ${outputPath}`);

  // Write a report file
  const reportPath = path.join(projectRoot, 'activity-sync-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    scannedFiles: scannedActivities,
    totalFiles: scannedActivities.length,
    groupedByStory: scannedActivities.reduce((acc, activity) => {
      const key = `${activity.activityGroup}-${activity.storyId}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(activity);
      return acc;
    }, {} as Record<string, ActivityFile[]>)
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Report written to: ${reportPath}`);
  
  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}