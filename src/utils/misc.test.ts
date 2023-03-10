import { isTargetEvent } from '@technote-space/filter-github-action';
import { getContext, testEnv } from '@technote-space/github-action-test-helper';
import { describe, expect, it } from 'vitest';
import { TARGET_EVENTS } from '../constant';

describe('isTargetEvent', () => {
  testEnv();

  it('should return true 1', () => {
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      payload: {
        action: 'opened',
      },
      eventName: 'pull_request',
    }))).toBe(true);
  });

  it('should return true 2', () => {
    process.env.INPUT_IGNORE_CONTEXT_CHECK = 'true';
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      payload: {
        action: 'synchronize',
      },
      eventName: 'pull_request',
    }))).toBe(true);
  });

  it('should return false 1', () => {
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      eventName: 'push',
    }))).toBe(false);
  });

  it('should return false 2', () => {
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      payload: {
        action: 'closed',
      },
      eventName: 'pull_request',
    }))).toBe(false);
  });
});
