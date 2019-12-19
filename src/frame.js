
function Frame() {
  this.frameScore = 0;
  this.roll = [];
  this.strike = false;
  this.spare = false;
}

Frame.prototype.getRolls = function () {
  // this is just personal preference but I probably wouldn't bother writing this
  // sort of method since there are no private variables in Javascript anyway
  return this.roll;
};

Frame.prototype.getFrameScore = function () {
  this.frameScore = this.calcFrameScore();
  return this.frameScore;
};

Frame.prototype.bowl = function (knockedPins) {
  if (knockedPins <= 10 && this.calcFrameScore(knockedPins) <= 10 && this.validateFrameLength()) {
    this.roll.push(knockedPins);
    this.isStrike();
    this.isSpare();
  }

  return this.getFrameScore();
};

Frame.prototype.validateFrameLength = function () {
  return this.roll.length < 2
};

Frame.prototype.calcFrameScore = function (num = 0) {
  return this.roll.reduce((a, b) => a + b, num);
};

Frame.prototype.isStrike = function () {
  if (this.roll[0] === 10) {
    this.strike = true;
  }
};

Frame.prototype.isSpare = function () {
  if (this.calcFrameScore() === 10) {
    this.spare = true;
  }
};

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = Frame;
}
