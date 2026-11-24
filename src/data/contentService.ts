import { PersonMode, CategoryModeItem, PersonaContentItem, PersonaProductItem, PersonaImageEntry } from '../types';
import { HER_CATEGORIES } from './her/categories';
import { HER_IDEAS } from './her/ideas';
import { HER_PRODUCTS } from './her/products';
import { HER_MICROCOPY } from './her/microcopy';
import { HER_IMAGES, getHerImage } from './her/images';

import { HIM_CATEGORIES } from './him/categories';
import { HIM_IDEAS } from './him/ideas';
import { HIM_PRODUCTS } from './him/products';
import { HIM_MICROCOPY } from './him/microcopy';
import { HIM_IMAGES, getHimImage } from './him/images';

import { US_CATEGORIES } from './us/categories';
import { US_IDEAS } from './us/ideas';
import { US_PRODUCTS } from './us/products';
import { US_MICROCOPY } from './us/microcopy';
import { US_IMAGES, getUsImage } from './us/images';

export interface PersonaDataset {
  categories: CategoryModeItem[];
  ideas: PersonaContentItem[];
  products: PersonaProductItem[];
  microcopy: typeof HER_MICROCOPY | typeof HIM_MICROCOPY | typeof US_MICROCOPY;
  getImage: (key: string) => PersonaImageEntry;
  imagesMap: Record<string, PersonaImageEntry>;
}

/**
 * Retrieve strictly persona-isolated dataset.
 * Prevents HIM content from appearing in HER, and vice versa.
 */
export const getPersonaDataset = (mode: PersonMode | null): PersonaDataset => {
  if (mode === 'HIM') {
    return {
      categories: HIM_CATEGORIES,
      ideas: HIM_IDEAS,
      products: HIM_PRODUCTS.filter(p => p.personCompatibility === 'HIM' || p.personCompatibility === 'UNIVERSAL'),
      microcopy: HIM_MICROCOPY,
      getImage: getHimImage,
      imagesMap: HIM_IMAGES
    };
  }

  if (mode === 'US') {
    return {
      categories: US_CATEGORIES,
      ideas: US_IDEAS,
      products: US_PRODUCTS.filter(p => p.personCompatibility === 'US' || p.personCompatibility === 'UNIVERSAL'),
      microcopy: US_MICROCOPY,
      getImage: getUsImage,
      imagesMap: US_IMAGES
    };
  }

  // Default to HER when mode === 'HER' or during safe initialization
  return {
    categories: HER_CATEGORIES,
    ideas: HER_IDEAS,
    products: HER_PRODUCTS.filter(p => p.personCompatibility === 'HER' || p.personCompatibility === 'UNIVERSAL'),
    microcopy: HER_MICROCOPY,
    getImage: getHerImage,
    imagesMap: HER_IMAGES
  };
};

/**
 * Content & Image Validator
 * Checks that every item has required fields, valid imageKey, and matches the target persona.
 */
export const validateContentItem = (item: PersonaContentItem, activeMode: PersonMode): boolean => {
  const dataset = getPersonaDataset(activeMode);
  
  if (!item.id || !item.title || !item.category || !item.imageKey || !item.description) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Content Validation Failed] Item missing required fields:`, item);
    }
    return false;
  }

  if (item.personCompatibility !== activeMode && item.personCompatibility !== 'UNIVERSAL') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Persona Leak Blocked] Content item "${item.title}" (${item.personCompatibility}) was blocked from displaying in ${activeMode} mode.`);
    }
    return false;
  }

  if (!dataset.imagesMap[item.imageKey] && !dataset.getImage(item.imageKey)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[ImageKey Missing] item "${item.title}" references unknown imageKey "${item.imageKey}" in ${activeMode} dataset.`);
    }
    return false;
  }

  return true;
};

/**
 * Resolve semantic image with accurate alt text for any persona
 */
export const resolvePersonaImage = (
  imageKey: string,
  mode: PersonMode
): PersonaImageEntry => {
  const dataset = getPersonaDataset(mode);
  return dataset.getImage(imageKey);
};

export {
  HER_CATEGORIES,
  HER_IDEAS,
  HER_PRODUCTS,
  HER_MICROCOPY,
  HER_IMAGES,
  HIM_CATEGORIES,
  HIM_IDEAS,
  HIM_PRODUCTS,
  HIM_MICROCOPY,
  HIM_IMAGES,
  US_CATEGORIES,
  US_IDEAS,
  US_PRODUCTS,
  US_MICROCOPY,
  US_IMAGES
};
