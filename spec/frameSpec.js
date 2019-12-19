const Frame = require('../src/frame');

describe('Frame', () => {
  let frame;

  beforeEach(() => {
    frame = new Frame();
  });

  describe('getRolls', () => {
    it('saves a roll when user bowls twice', () => {
      frame.bowl(5);
      frame.bowl(3);
      expect(frame.getRolls()).toContain(5);
      expect(frame.getRolls()).toContain(3);
    });

    it('does not save roll when user bowls >2', () => {
      frame.bowl(5);
      frame.bowl(3);
      frame.bowl(4);
      expect(frame.getFrameScore()).toEqual(8);
    });

    it('does not save roll when knockedPins is >10', () => {
      frame.bowl(15);
      expect(frame.getFrameScore()).toEqual(0);
    });
  });

  describe('validateFrameLength', () => {
    it('returns false when roll array length is >=2', () => {
      frame.bowl(5);
      frame.bowl(3);
      frame.bowl(4);
      frame.roll.length = 3;
      expect(frame.validateFrameLength()).toBe(false);
    });
  });

  describe('calcFrameScore', () => {
    it('totals the score for the frame', () => {
      frame.bowl(5);
      frame.bowl(3);
      expect(frame.calcFrameScore()).toEqual(8);
    });
  });

  describe('getFrameScore', () => {
    it('returns the score so far', () => {
      frame.bowl(5);
      frame.bowl(3);
      frame.calcFrameScore();
      expect(frame.getFrameScore()).toEqual(8);
    });
  });

  describe('strike functin', () => {
    it('returns true if players bowls 10', () => {
      frame.bowl(10);
      expect(frame.strike).toEqual(true);
    });
  });

  describe('spare function', () => {
    it('returns true if frame score is 10', () => {
      frame.bowl(5);
      frame.bowl(5);
      expect(frame.spare).toEqual(true);
    });
  });
});
