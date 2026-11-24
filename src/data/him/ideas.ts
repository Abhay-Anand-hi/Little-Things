import { PersonaContentItem } from '../../types';
import { HIM_DO_IDEAS } from './ideas_do';
import { HIM_TELL_IDEAS } from './ideas_tell';
import { HIM_SURPRISE_IDEAS } from './ideas_surprise';
import { HIM_SMILE_IDEAS } from './ideas_smile';
import { HIM_APPRECIATE_IDEAS } from './ideas_appreciate';
import { HIM_REMEMBER_IDEAS } from './ideas_remember';
import { HIM_JUSTBECAUSE_IDEAS } from './ideas_justbecause';

export const HIM_IDEAS: PersonaContentItem[] = [
  ...HIM_DO_IDEAS,
  ...HIM_TELL_IDEAS,
  ...HIM_SURPRISE_IDEAS,
  ...HIM_SMILE_IDEAS,
  ...HIM_APPRECIATE_IDEAS,
  ...HIM_REMEMBER_IDEAS,
  ...HIM_JUSTBECAUSE_IDEAS
];
