import type { Context } from '@actions/github/lib/context';
import type { Logger } from '@technote-space/github-action-log-helper';
import { getInput } from '@actions/core';
import { Utils } from '@technote-space/github-action-helper';
import canNpmPublish from 'can-npm-publish';

export const getHeadSha = (context: Context): string => context.payload.pull_request?.head.sha ?? '';

export const execute = async(logger: Logger): Promise<void> => {
  if (!Utils.isCloned(Utils.getWorkspace())) {
    logger.error('Please checkout before run this action.');
    return;
  }

  const verbose = Utils.getBoolValue(getInput('VERBOSE'));
  await canNpmPublish.canNpmPublish(getInput('PACKAGE_PATH') || undefined, { verbose }).catch(async error => {
    throw new Error(error.message);
  });
};
