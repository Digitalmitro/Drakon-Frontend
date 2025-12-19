#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const configImport = `import API_BASE_URL from '../config/api';`;
const configImport2 = `import API_BASE_URL from '../../config/api';`;
const configImport3 = `import API_BASE_URL from '../../../config/api';`;

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if file has hardcoded URLs
  const hasHardcodedURL = content.includes('https://api.drakon-sports.com');
  
  if (!hasHardcodedURL) return;

  // Check if already has API_BASE_URL
  if (content.includes('API_BASE_URL')) {
    // Just replace URLs, import already exists
    content = content.replace(/https:\/\/api\.drakon-sports\.com/g, '${API_BASE_URL}');
    modified = true;
  } else {
    // Need to add import
    const depth = filePath.split('/').filter(p => p === 'src').length;
    const pathParts = filePath.split('/src/')[1].split('/');
    const level = pathParts.length - 1;
    
    let importPath;
    if (level === 1) importPath = './config/api';
    else if (level === 2) importPath = '../config/api';
    else if (level === 3) importPath = '../../config/api';
    else importPath = '../../../config/api';
    
    const importLine = `import API_BASE_URL from '${importPath}';`;
    
    // Find last import line
    const lines = content.split('\n');
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, importLine);
      content = lines.join('\n');
      modified = true;
    }
    
    // Replace URLs
    content = content.replace(/https:\/\/api\.drakon-sports\.com/g, '${API_BASE_URL}');
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${filePath.replace(__dirname + '/', '')}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.')) {
      walkDir(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      updateFile(filePath);
    }
  });
}

console.log('Starting API URL replacement...\n');
walkDir(srcDir);
console.log('\n✅ Done!');
