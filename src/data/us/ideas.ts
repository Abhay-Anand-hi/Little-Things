import { PersonaContentItem } from '../../types';
import { US_DO_IDEAS } from './ideas_do';
import { US_SAY_IDEAS } from './ideas_say';
import { US_SURPRISE_IDEAS } from './ideas_surprise';
import { US_SMILE_IDEAS } from './ideas_smile';
import { US_PLAN_IDEAS } from './ideas_plan';
import { US_MEMORIES_IDEAS } from './ideas_memories';
import { US_JUSTBECAUSE_IDEAS } from './ideas_justbecause';

export const US_IDEAS: PersonaContentItem[] = [
  ...US_DO_IDEAS,
  ...US_SAY_IDEAS,
  ...US_SURPRISE_IDEAS,
  ...US_SMILE_IDEAS,
  ...US_PLAN_IDEAS,
  ...US_MEMORIES_IDEAS,
  ...US_JUSTBECAUSE_IDEAS
];
