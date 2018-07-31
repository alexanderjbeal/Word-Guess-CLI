// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses
//   * 
//   * 3. `Letter.js` *should not* `require` any other files.

//   4. `Word.js` *should only* require `Letter.js`
  
//   5. **HINT:** Write `Letter.js` first and test it on its own before moving on, then do the same thing with `Word.js`
  
//   6. **HINT:** If you name your letter's display function `toString`, JavaScript will call that function automatically whenever casting that object to a string (check out this example: <https://jsbin.com/facawetume/edit?js,console>)


const inquirer = require("inquirer");
let Word = require("./word");

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const wordArray = ['blockchain', 'node', 'cryptocurrency', 'interoperability', 'poa network', 'ethereum', 'sidechain', 'validator'];
const logoDisplay = () => {
  console.log('====================================================================');
  console.log('|   ___  __   __ _  ____  ____  ____  _  _   ___  ____  __  ____   |');
  console.log('|  / __)/  \\ (  ( \\/ ___)(_  _)(  _ \\/ )( \\ / __)(_  _)/  \\(  _ \\  |');
  console.log('| ( (__(  O )/    /\\___ \\  )(   )   /) \\/ (( (__   )( (  O ))   /  |');
  console.log('|  \\___)\\__/ \\_)__)(____/ (__) (__\\_)\\____/ \\___) (__) \\__/(__\\_)  |');
  console.log('|     _  _   __  ____  ____     ___  _  _  ____  ____  ____        |');
  console.log('|    / )( \\ /  \\(  _ \\(    \\   / __)/ )( \\(  __)/ ___)/ ___)       |');
  console.log('|    \\ /\\ /(  O ))   / ) D (  ( (_ \\) \\/ ( ) _) \\___ \\\\___ \\       |');
  console.log('|    (_/\\_) \\__/(__\\_)(____/   \\___/\\____/(____)(____/(____/       |');
  console.log('|                     2018 Alexander Beal                          |');
  console.log('====================================================================');
  console.log('|  Use your letter keys to try and guess the hidden word           |');
  console.log('====================================================================\n');
};

let selectedWord;
let word;

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const selectRandomWord = () => {
  selectedWord = wordArray[getRandomIntInclusive(0, wordArray.length - 1)];
};

const isLetter = (guess) => {
  if ((alphabet.indexOf(guess) < 0) || (guess === '')) {
    console.log(`...that's not a letter...try again`);
    return 0;
  }
  else {
    return 1;
  }
};

const round = () => {
  word.updateWordDisplay();
  console.log(' ');
  inquirer.prompt([
    { name: 'guess',
      message: 'What letter would you like to guess?'
    },
  ]).then((response) => {
    let guess = response.guess.toLowerCase();
    if (guess === 'exit') {
      process.exit();
    }
    else {
      if (isLetter(guess) === 1) {
        if (word.checkGuess(guess) === 0) {
          playAgain();
        }
        else {
          round();
        }
      }
      else {
        round();
      }
    }
  });
};

const game = () => {
  console.clear();
  logoDisplay();
  gameInProgress = true;
  selectRandomWord();
  word = new Word(selectedWord);
  word.makeLetterArray();
  round();
};

const playAgain = () => {
  inquirer.prompt([
    { type: 'list',
      name: 'playAgain',
      message: 'Would you like to play again?',
      choices: ['Yes', 'No']
    },
  ]).then(function (response) {
    let playAgain = response.playAgain;
    if (playAgain === 'No') {
      console.log('Ok, see you next time!');
      process.exit();
    }
    else {
      game();
    }
  });
};

game();