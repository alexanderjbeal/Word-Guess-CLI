let Letter = require("./letter");

let Word = function (word) {
  this.word = word;
  this.wordLength = word.length;
  this.guessesLeft = 10;
  this.letterObjectArray = [];
  this.letterArrayDisplay = [];
  this.guessesSoFar = [];
  this.makeLetterArray = () => {
    for (let i = 0; i < this.wordLength; i++) {
      let letter = new Letter(this.word.charAt(i));
      if (letter.value === ' ') {
        letter.hidden = false;
      }
      this.letterObjectArray.push(letter);
    }
  };
  this.updateWordDisplay = () => {
    this.letterArrayDisplay =[];
    for (let letterObject of this.letterObjectArray) {
      if ((letterObject.hidden === true) && (letterObject.value !== ' ')) {
        this.letterArrayDisplay.push('_');
      }
      else if ((letterObject === true) && (letterObject.value === ' ')){
        this.letterArrayDisplay.push(' ');
      }
      else {
        this.letterArrayDisplay.push(letterObject.value);
      }
    }
    console.log(this.letterArrayDisplay.join(' '));
  };
  this.checkGuess = function (guess) {
    if (this.guessesSoFar.indexOf(guess) < 0) {
      if (this.word.indexOf(guess) < 0) {
        this.guessesLeft--;
        if (this.guessesLeft < 1) {
          console.log('game over man!');
          return 0;
        }
        else {
          this.guessesSoFar.push(guess);
          console.log(`Incorrect Guess! You have ${this.guessesLeft} guesses remaining.`);
          console.log(`These are the letters you've already guessed: ${this.guessesSoFar.join(', ')}`);
        }
      }
      else {
        this.guessesSoFar.push(guess);
        let countOfHidden = 0;
        console.log('Correct Guess!');
        for (let letterObject of this.letterObjectArray) {
          if (letterObject.value === guess) {
            letterObject.hidden = false;
          }
          if (letterObject.hidden === true) {
            countOfHidden++;
          }
        }
        if (countOfHidden === 0) {
          console.log('Congratulations. You are victorious.');
          this.updateWordDisplay();
          return 0;
        }
      }
    }
    else {
      console.log(`You've already guessed that letter.`);
      console.log(`These are the letters you've already guessed: ${this.guessesSoFar.join(', ')}`);
    }
  }
};

module.exports = Word;