const fs = require('fs');
const path = require('path');

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
    case 'read':
        readFile(file);
        break;
    case 'delete':
        deleteFile(file);
        break;
    case 'create':
        createFile(file);
        break;
    case 'append':
        appendToFile(file, content);
        break;
    case 'rename':
        renameFile(file, content);
        break;
    case 'list':
        listDirectory(file || '.');
        break;
    default:
        console.log(`Invalid operation '${operation}'`);
}

function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
    }
}

function deleteFile(filePath) {
    try {
        fs.unlinkSync(filePath);
        console.log(`File '${filePath}' deleted`);
    } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
    }
}

function createFile(filePath) {
    try {
        fs.writeFileSync(filePath, '', { flag: 'wx' });
        console.log(`File '${filePath}' created`);
    } catch (err) {
        console.error(`Error creating file: ${err.message}`);
    }
}

function appendToFile(filePath, content) {
    try {
        fs.appendFileSync(filePath, content + '\n');
        console.log(`Content appended to the file '${filePath}'`);
    } catch (err) {
        console.error(`Error appending to file: ${err.message}`);
    }
}

function renameFile(oldPath, newPath) {
    try {
        fs.renameSync(oldPath, newPath);
        console.log(`File '${oldPath}' renamed to '${newPath}'`);
    } catch (err) {
        console.error(`Error renaming file: ${err.message}`);
    }
}

function listDirectory(dirPath) {
    try {
        const files = fs.readdirSync(dirPath);
        console.log('Files and directories in the current directory:');
        files.forEach(file => {
            console.log(file);
        });
    } catch (err) {
        console.error(`Error listing directory: ${err.message}`);
    }
}