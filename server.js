const { spawn } = require('child_process');
const fs = require('fs');

const args = process.argv.slice(2);
const shell = spawn('bash', ['-c', args.join('')])
const logFile = fs.createWriteStream('output.log', {flags: 'a'})


shell.stdout.on('data', (data) => {
    logFile.write(data);
    process.stdout.write(data);
});

shell.stderr.on('data', (data) => {
    logFile.write(data);
    process.stderr.write(data);
});

shell.on('close', (code) => {
    logFile.write(`Shell process exited with code ${code}\n`);
    logFile.end();
    console.log(`Shell process exited with code ${code}`);
});