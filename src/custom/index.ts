/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs-extra';
import * as path from 'path';
import execa from 'execa';
import childProcess, { StdioOptions } from 'child_process';
import logger from '../logger/logger';
import Helper from '../e2e-helper/e2e-helper';
import NpmCiRegistry from './npm-ci-registry';

export default publishCompoent;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function publishCompoent(componentsId: string[]): Promise<any> {
  if (!componentsId) {
    return;
  }

  const helper = new Helper();
  const npmCiRegistry = new NpmCiRegistry(helper);
  await npmCiRegistry.init();

  logger.error('==============', componentsId);

  helper.scopeHelper.reInitLocalScope();

  helper.scopeHelper.setNewLocalAndRemoteScopes();

  helper.extensions.importNpmPackExtension();
  helper.scopeHelper.removeRemoteScope();

  helper.command.runCmd('bit remote add file:///Volumes/SourceCode/TestV2/bit.dev/scope');

  // eslint-disable-next-line prefer-template
  const cm = 'bit import ' + componentsId[0] + ' --override';
  logger.error(helper.command.runCmd(cm));

  npmCiRegistry.publishComponent(componentsId[0]);
}
