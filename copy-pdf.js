import fs from 'fs';
import path from 'path';

// Source and destination paths
const srcPdf = path.join(process.cwd(), 'doc', '简历.pdf');
const destDir = path.join(process.cwd(), 'public', 'doc');
const destPdf = path.join(destDir, '简历.pdf');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created directory:', destDir);
}

// Copy the file
fs.copyFileSync(srcPdf, destPdf);
console.log('Copied 简历.pdf to', destPdf);
