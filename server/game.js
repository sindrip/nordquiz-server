class Game {

  // GAME STATES: [PRE, PLAY, POST, END]
  constructor(questions) {
    this.state = 'PRE';
    // console.log(questions[0].question)s

    this.questions = questions;
    this.question = null;
    this.questionNumber = -1;
  }

  // PAYLOAD : { STATE, DATA }
  _payload(data) {
    return {
      state: this.state,
      data,
    };
  };
    
  start() {
    if (this.state === 'PRE') {
      this.state = 'PLAY';
    }    
  }

  nextQuestion() {
    if (this.state !== 'PLAY') return this._payload(null);

    console.log(this.questionNumber, this.questions.length);

    if (++this.questionNumber === this.questions.length) {
      this.state = 'POST';
      return this._payload(null);
    }
    
    this.question = this.questions[this.questionNumber];

    return this._payload(this.question);
  }

  getPlayedQuestions() {
    if (this.state === 'POST') return this._payload(this.questions);
    
    let questions = [];

    for (let i = 0; i < this.questionNumber + 1; i++) {
      questions.push(this.questions[i]);
    }

    return this._payload(questions);
  }

  getQuestions() {
    return this.questions;
  }

  getQuestionNumber() {
    return this.questionNumber;
  }

  getState() {
    return this.state;
  }
}

module.exports.Game = Game;
