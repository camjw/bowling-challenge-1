
function Scorecard() {
  this.frameNumber = 1;
  this.frames = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [],
  };
  this.bonusFrame = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
  };
  this.bonusScore = 0;
  this.cumulativeScore = 0;
  this.finalFrameBonus = [];
  this.gameOver = false;
}

Scorecard.prototype.initFrames = function (frame) {
  this.frames[this.frameNumber] = frame;
  this.frameNumber++;
  this.calcFrameBonus();
};

Scorecard.prototype.getCumulativeScore = function () {
  for (let i = 1; i < 11; i++) {
    this.cumulativeScore += this.frames[i].frameScore;
  }
  return this.cumulativeScore;
};

// for first 8 frames
Scorecard.prototype.calcFrameBonus = function () {
  for (let i = 1; i < 9; i++) {
    if (this.frames[i].strike) {
      this.bonusFrame[i] = (this.frames[i + 1].frameScore || 0) + (this.frames[i + 2].frameScore || 0);
    } else if (this.frames[i].spare) {
      this.bonusFrame[i] = this.frames[i + 1][0];
    }
  }
  this.getPenultimateFrameBonus();
  return this.bonusFrame;
};

// for 9th frame
Scorecard.prototype.getPenultimateFrameBonus = function () {
  if (this.frames[9].strike) {
    this.bonusFrame[9] = (this.frames[9].frameScore || 0) + (this.frames[10].frameScore || 0);
  } else if (this.frames[9].spare) {
    this.bonusFrame[9] = this.frames[9][0];
  }
};

// for 10th frame
Scorecard.prototype.getFinalFrameBonus = function (pins) {
  if (pins > 10) {
    console.log('You cannot knock more than 10 pins');
  } else if (this.frames[10].strike || this.frames[10].spare) {
    if (pins === 10) {
      this.finalFrameBonus.push(pins);
      this.lastBonus;
    } else {
      this.finalFrameBonus.push(pins);
    }
  }
};

Scorecard.prototype.lastBonus = function (pins) {
  this.finalFrameBonus.push(pins);
};

Scorecard.prototype.calcFinalFrameBonus = function () {
  return this.finalFrameBonus.reduce((a, b) => a + b, 0);
};

Scorecard.prototype.calcBonusScore = function () {
  for (let i = 1; i < 11; i++) {
    this.bonusScore += this.bonusFrame[i];
  }
  return this.bonusScore;
};

Scorecard.prototype.getTotalScore = function () {
  return this.getCumulativeScore() + this.calcBonusScore() + this.calcFinalFrameBonus();
};

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = Scorecard;
}
