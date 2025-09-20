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

interface ChangeLog {
  timestamp: string;
  changes: Array<{
    type: 'new_activity' | 'update_url' | 'add_language';
    groupName: string;
    storyId: string;
    activityId: string;
    language?: string;
    details: string;
    oldValue?: string;
    newValue: string;
    action: 'auto_added' | 'user_approved' | 'user_rejected';
  }>;
  summary: {
    newActivities: number;
    languagesAdded: number;
    urlsUpdated: number;
    autoChanges: number;
    userApprovedChanges: number;
    userRejectedChanges: number;
  };
}

const LANGUAGE_MAP: Record<string, string> = {
  'E': 'en',
  'F': 'fr', 
  'G': 'de',
  'S': 'svn',
  'SL': 'svn',
  'SVN': 'svn',
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

// Global change log
const changeLog: ChangeLog = {
  timestamp: new Date().toISOString(),
  changes: [],
  summary: {
    newActivities: 0,
    languagesAdded: 0,
    urlsUpdated: 0,
    autoChanges: 0,
    userApprovedChanges: 0,
    userRejectedChanges: 0
  }
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

function logChange(
  type: 'new_activity' | 'update_url' | 'add_language',
  groupName: string,
  storyId: string,
  activityId: string,
  details: string,
  newValue: string,
  action: 'auto_added' | 'user_approved' | 'user_rejected',
  language?: string,
  oldValue?: string
) {
  changeLog.changes.push({
    type,
    groupName,
    storyId,
    activityId,
    language,
    details,
    oldValue,
    newValue,
    action
  });

  // Update summary
  switch (type) {
    case 'new_activity':
      changeLog.summary.newActivities++;
      break;
    case 'add_language':
      changeLog.summary.languagesAdded++;
      break;
    case 'update_url':
      changeLog.summary.urlsUpdated++;
      break;
  }

  switch (action) {
    case 'auto_added':
      changeLog.summary.autoChanges++;
      break;
    case 'user_approved':
      changeLog.summary.userApprovedChanges++;
      break;
    case 'user_rejected':
      changeLog.summary.userRejectedChanges++;
      break;
  }

  // Also log to console with detailed information
  const prefix = type === 'new_activity' ? '🆕' : type === 'add_language' ? '🌐' : '🔄';
  const actionIcon = action === 'auto_added' ? '⚡' : action === 'user_approved' ? '✅' : '❌';
  
  console.log(`    ${prefix}${actionIcon} ${details}`);
  if (oldValue && newValue !== oldValue) {
    console.log(`       📤 Old: ${oldValue}`);
  }
  console.log(`       📥 New: ${newValue}`);
  
  if (type === 'new_activity') {
    console.log(`       🎯 Action: Automatically added new activity with ${language ? `language ${language}` : 'multiple languages'}`);
  } else if (type === 'add_language') {
    console.log(`       🎯 Action: Automatically added missing language '${language}'`);
  } else {
    console.log(`       🎯 Action: ${action === 'user_approved' ? 'User approved URL change' : action === 'user_rejected' ? 'User rejected URL change' : 'Automatically updated'}`);
  }
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
            
            console.log(`📄 Checking file: ${item.name} in ${activityGroup}`);
            
            const match = item.name.match(/Story[_\s]?(\d+)[_\s](\w+)[_\s](\d+)[_\s]([A-Z]{1,3})\.pdf/i);
            if (match) {
              const [, , , activityNumber, langCode] = match;
              const language = LANGUAGE_MAP[langCode.toUpperCase()];
              
              console.log(`🔍 Matched: ${item.name} -> Story: ${storyId}, Group: ${activityGroup}, Activity: ${activityNumber}, LangCode: ${langCode}, Language: ${language}`);
              
              if (language) {
                activities.push({
                  storyId,
                  activityGroup: activityGroup.toUpperCase(),
                  activityNumber,
                  language,
                  filePath: webPath
                });
              } else {
                console.log(`⚠️  Unknown language code: ${langCode} in file ${item.name}`);
              }
            } else {
              console.log(`❌ No match for file: ${item.name}`);
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

  console.log('\n🔄 PROPOSED URL CHANGES (requiring confirmation):');
  console.log('==================================================');
  
  for (let i = 0; i < proposedChanges.length; i++) {
    const change = proposedChanges[i];
    
    if (change.type === 'update_url') {
      console.log(`\n--- URL Change ${i + 1} ---`);
      console.log(`📍 Location: ${change.groupName} > Story ${change.storyId} > ${change.activityId} > ${change.language}`);
      console.log(`📤 Current URL: ${change.currentUrl}`);
      console.log(`📥 Found file:  ${change.proposedUrl}`);
      console.log(`📝 Description: ${change.description}`);
      
      const choice = await askQuestion('\nUpdate this URL? (y/n): ');
      if (choice.toLowerCase().startsWith('y')) {
        acceptedChanges.push(change);
        console.log('✅ Change accepted');
      } else {
        console.log('❌ Change rejected');
        logChange(
          'update_url',
          change.groupName,
          change.storyId,
          change.activityId,
          change.description,
          change.proposedUrl || '',
          'user_rejected',
          change.language,
          change.currentUrl
        );
      }
    } else {
      // Auto-add missing languages (no confirmation needed)
      acceptedChanges.push(change);
    }
  }
  
  return acceptedChanges;
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
          // Activity doesn't exist in this group - add it automatically
          console.log(`    ➕ Adding new activity: ${activityId} to ${groupName}`);
          const newActivityCode = generateNewActivityCode(storyId, activityNumber, files);
          updatedContent = addActivityToIndex(updatedContent, groupName, storyId, newActivityCode);
          
          // Log the new activity with all its languages
          const languageList = files.map(f => `${f.language} (${f.filePath})`).join(', ');
          logChange(
            'new_activity',
            groupName,
            storyId,
            activityId,
            `Added new activity ${activityId} to ${groupName}/Story ${storyId} with languages: ${files.map(f => f.language).join(', ')}`,
            languageList,
            'auto_added'
          );
        } else {
          // Activity exists - check for missing languages or different URLs
          console.log(`    🔍 Checking existing activity: ${activityId} in ${groupName}`);
          
          for (const file of files) {
            const existingLang = existingActivity.languages[file.language];
            
            if (!existingLang) {
              // Missing language - add automatically
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
              // URL differs - ask for confirmation
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
    
    // Log the accepted change
    const action = change.type === 'add_language' ? 'auto_added' : 'user_approved';
    logChange(
      change.type,
      change.groupName,
      change.storyId,
      change.activityId,
      change.description,
      change.proposedUrl,
      action,
      change.language,
      change.currentUrl
    );
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

  // Write detailed change log
  const changeLogPath = path.join(projectRoot, 'activity-changes.json');
  fs.writeFileSync(changeLogPath, JSON.stringify(changeLog, null, 2));
  
  // Print comprehensive summary
  console.log('\n📊 COMPREHENSIVE SUMMARY:');
  console.log('========================');
  console.log(`🆕 New activities added automatically: ${changeLog.summary.newActivities}`);
  console.log(`🌐 Languages added automatically: ${changeLog.summary.languagesAdded}`);
  console.log(`🔄 URLs updated (user approved): ${changeLog.summary.urlsUpdated}`);
  console.log(`⚡ Total automatic changes: ${changeLog.summary.autoChanges}`);
  console.log(`✅ Total user-approved changes: ${changeLog.summary.userApprovedChanges}`);
  console.log(`❌ Total user-rejected changes: ${changeLog.summary.userRejectedChanges}`);
  console.log(`📝 Total changes made: ${changeLog.changes.filter(c => c.action !== 'user_rejected').length}`);
  console.log(`📄 Detailed change log: ${changeLogPath}`);
  
  if (changeLog.changes.length > 0) {
    console.log('\n📋 DETAILED CHANGES MADE:');
    console.log('=========================');
    changeLog.changes
      .filter(change => change.action !== 'user_rejected')
      .forEach((change, index) => {
        const icon = change.type === 'new_activity' ? '🆕' : change.type === 'add_language' ? '🌐' : '🔄';
        const actionIcon = change.action === 'auto_added' ? '⚡' : '✅';
        console.log(`${index + 1}. ${icon}${actionIcon} ${change.details}`);
        console.log(`   📍 ${change.groupName} > Story ${change.storyId} > ${change.activityId}${change.language ? ` > ${change.language}` : ''}`);
        if (change.oldValue) {
          console.log(`   📤 Old: ${change.oldValue}`);
        }
        console.log(`   📥 New: ${change.newValue}`);
        console.log(`   🎯 ${change.action === 'auto_added' ? 'Added automatically' : 'User approved'}`);
        console.log('');
      });
    
    if (changeLog.summary.userRejectedChanges > 0) {
      console.log('\n❌ REJECTED CHANGES:');
      console.log('===================');
      changeLog.changes
        .filter(change => change.action === 'user_rejected')
        .forEach((change, index) => {
          console.log(`${index + 1}. 🔄❌ ${change.details}`);
          console.log(`   📍 ${change.groupName} > Story ${change.storyId} > ${change.activityId} > ${change.language}`);
          console.log(`   📤 Kept: ${change.oldValue}`);
          console.log(`   📥 Rejected: ${change.newValue}`);
          console.log('');
        });
    }
  }
  
  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}