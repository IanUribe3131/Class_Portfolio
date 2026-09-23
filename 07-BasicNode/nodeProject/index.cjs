const sw = require('star-wars-quotes')
const { randomSupervillain } = require('supervillains');
const { randomSuperhero } = require('superheroes');
const { readFile } = require('fs/promises');

const filePath = './data/input.txt';

async function readText(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    console.log("Seccret message: " + data);
  } catch (err) {
    console.error('Error reading the file: ', err);
  }
}
console.log("Hello, World");
console.log(sw());
console.log(randomSuperhero() + " launches " + randomSupervillain() + " to the air");
console.log(randomSupervillain() + " comes back with a kick to the stomach directed to " + randomSuperhero());
readText(filePath)



