import { mergeTests } from '@playwright/test';
import { logger } from './logManager';
import { beforeAfterManager } from './beforefterManager';
import { pageInstance } from './pageManager';

export const test = mergeTests(pageInstance, logger, beforeAfterManager);