import { PersonaContentItem } from '../../types';
import { HER_DO_IDEAS } from './ideas_do';
import { HER_TELL_IDEAS } from './ideas_tell';
import { HER_SURPRISE_IDEAS } from './ideas_surprise';
import { HER_COMPLIMENT_IDEAS } from './ideas_compliment';
import { HER_SMILE_IDEAS } from './ideas_smile';
import { HER_REMEMBER_IDEAS } from './ideas_remember';
import { HER_JUSTBECAUSE_IDEAS } from './ideas_justbecause';

export const HER_IDEAS: PersonaContentItem[] = [
  ...HER_DO_IDEAS,
  ...HER_TELL_IDEAS,
  ...HER_SURPRISE_IDEAS,
  ...HER_COMPLIMENT_IDEAS,
  ...HER_SMILE_IDEAS,
  ...HER_REMEMBER_IDEAS,
  ...HER_JUSTBECAUSE_IDEAS
];
