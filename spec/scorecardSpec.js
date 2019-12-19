const Frame = require('../src/frame');
const Scorecard = require('../src/scorecard');

describe('Scorecard', () => {
  let card;
  let frame;

  beforeEach(() => {
    card = new Scorecard();
    frame = new Frame();
  });

  describe('initFrames', () => {
    it('pushes a frame into the frames hash', () => {
      frame = [5, 2];
      card.initFrames(frame);
      expect(card.frames).toEqual({
        1: [5, 2], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [],
      });
    });
  });

  describe('gutter game', () => {
    it('returns a total score of 0 for gutter game', () => {
      const frames = [];
      for (let i = 0; i < 10; i++) {
        frames[i] = new Frame();
        frames[i].bowl(0);
        frames[i].bowl(0);
      }

      for (let i = 0; i < 10; i++) {
        card.initFrames(frames[i]);
      }
      expect(card.getCumulativeScore()).toEqual(0);
    });
  });

  describe('total score', () => {
    it('returns total score when no strike or spare', () => {
      const frames = [];
      for (let i = 0; i < 10; i++) {
        frames[i] = new Frame();
        frames[i].bowl(4);
        frames[i].bowl(4);
      }
      for (let i = 0; i < 10; i++) {
        card.initFrames(frames[i]);
      }
      expect(card.getTotalScore()).toEqual(80);
    });
  });

  describe('a perfect game', () => {
    it('shows a total score of 300 for a perfect game', () => {
      const frames = [];
      for (let i = 0; i < 10; i++) {
        frames[i] = new Frame();
        frames[i].bowl(10);
        frames[i].bowl(0);
      }
      for (let i = 0; i < 10; i++) {
        card.initFrames(frames[i]);
      }
      card.getFinalFrameBonus(10);
      card.lastBonus(10);
      expect(card.getTotalScore()).toEqual(300);
    });
  });

  describe('a normal game', () => {
    it('shows the total score', () => {
      const frames = [];
      for (let i = 0; i < 9; i++) {
        frames[i] = new Frame();
        frames[i].bowl(6);
        frames[i].bowl(0);
      }

      const frame10 = new Frame();
      frame10.bowl(7);
      frame10.bowl(3);
      frames.push(frame10);

      for (let i = 0; i < 10; i++) {
        card.initFrames(frames[i]);
      }
      card.getFinalFrameBonus(5);
      expect(card.getTotalScore()).toEqual(69);
    });
  });
});
