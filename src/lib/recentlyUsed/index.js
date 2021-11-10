import {
  EMOJI_PROPERTY_UNIFIED,
  EMOJI_PROPERTY_SKIN_VARIATIONS,
} from '../../../lib/constants';
import globalObject from '../globalObject';

const RECENTLY_USED_KEY = 'epr_ru';

const LOCAL_STORAGE_PRESENT = 'localStorage' in globalObject;

export const getRecentlyUsed = () => {
  if (!LOCAL_STORAGE_PRESENT) {
    return [];
  }

  const ruList = localStorage.getItem(RECENTLY_USED_KEY);

  return !ruList ? [] : JSON.parse(ruList);
};

export const setRecentlyUsed = ({ unified, originalUnified }) => {
  if (!LOCAL_STORAGE_PRESENT) {
    return;
  }

  const unifiedParts = unified.split('-');

  let skinVariation = '';

  if (unified !== originalUnified && unifiedParts.length > 1) {
    skinVariation = unifiedParts[1];
  }

  const ruList = [
    {
      [EMOJI_PROPERTY_UNIFIED]: originalUnified,
      ...(skinVariation && { [EMOJI_PROPERTY_SKIN_VARIATIONS]: skinVariation }),
    },
    ...getRecentlyUsed().filter(
      item => item[EMOJI_PROPERTY_UNIFIED] !== originalUnified
    ),
  ];

  const output = ruList.splice(0, 14);

  localStorage.setItem(RECENTLY_USED_KEY, JSON.stringify(output));
};
