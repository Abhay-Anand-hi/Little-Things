import { CategoryModeItem, PersonMode } from '../types';
import { HER_CATEGORIES } from './her/categories';
import { HIM_CATEGORIES } from './him/categories';
import { US_CATEGORIES } from './us/categories';

export { HER_CATEGORIES, HIM_CATEGORIES, US_CATEGORIES };

export function getCategoriesForMode(mode?: PersonMode | null): CategoryModeItem[] {
  switch (mode) {
    case 'HIM':
      return HIM_CATEGORIES;
    case 'US':
      return US_CATEGORIES;
    case 'HER':
    default:
      return HER_CATEGORIES;
  }
}

export const getModeCategories = getCategoriesForMode;
