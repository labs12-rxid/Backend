// This project has incurred my wrath.
const { spawn } = require('child_process');
const getStream = require('getstream');
// const util = require('util');

async function theAbomination(script, ...args) {
  const giantSnake = spawn('python3', [script, ...args], {
    cwd: '/srv/www/flask'
  });

  const venom = giantSnake.stdout.on('data', (chunk) => {
    let textChunk = chunk.toString('utf8');

    return textChunk;
  })

  return await getStream(venom);
}

// async function wisdomFromPythia(wisdom) {
//   for await (const line of chunksToLinesAsync(wisdom)) { // (C)
//     console.log('LINE: '+chomp(line))
//   }
// }

module.exports = theAbomination;