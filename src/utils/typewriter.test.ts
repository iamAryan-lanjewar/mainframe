import test from 'node:test';
import assert from 'node:assert/strict';
import { getTypewriterSlice, calculateTargetScrubTime } from './typewriter.ts';

test('getTypewriterSlice returns correct prefix and done status', () => {
  const text = 'Hello Mainframe';
  assert.deepEqual(getTypewriterSlice(text, 0), { displayed: '', done: false });
  assert.deepEqual(getTypewriterSlice(text, 5), { displayed: 'Hello', done: false });
  assert.deepEqual(getTypewriterSlice(text, 15), { displayed: 'Hello Mainframe', done: true });
  assert.deepEqual(getTypewriterSlice(text, 20), { displayed: 'Hello Mainframe', done: true });
});

test('calculateTargetScrubTime calculates correct clamped video time', () => {
  const duration = 10;
  const windowWidth = 1000;
  const sensitivity = 0.8;

  // Moving right by 100px on 1000px wide screen:
  // (100 / 1000) * 0.8 * 10 = 0.8s increase
  const result1 = calculateTargetScrubTime(2, 100, windowWidth, duration, sensitivity);
  assert.equal(Math.round(result1 * 100) / 100, 2.8);

  // Clamping to duration max
  const resultMax = calculateTargetScrubTime(9.5, 200, windowWidth, duration, sensitivity);
  assert.equal(resultMax, 10);

  // Clamping to 0 min
  const resultMin = calculateTargetScrubTime(0.5, -200, windowWidth, duration, sensitivity);
  assert.equal(resultMin, 0);

  // Edge cases: 0 duration or 0 width returns current time
  assert.equal(calculateTargetScrubTime(4, 50, 0, duration), 4);
  assert.equal(calculateTargetScrubTime(4, 50, windowWidth, 0), 4);
});
