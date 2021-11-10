import React from 'react';
import PropTypes from 'prop-types';
import emojiSrc from '../../lib/emojiSrc';
import { actionTypes } from '../../lib/reducer';
import './style.css';

const handleError = (unified, dispatch = Function.prototype) => {
  dispatch({
    type: actionTypes.EMOJI_NOT_LOADED_SET,
    unified,
  });
};

const EmojiImg = ({ unified, dispatch, shouldLoad = true, native = false }) => {
  return native ? (
    <div className="native">
      {unified
        .split('-')
        .map(hex => parseInt(hex, 16))
        .map(hex => String.fromCodePoint(hex))
        .join('')}
    </div>
  ) : (
    <img
      className="emoji-img"
      onError={() => handleError(unified, dispatch)}
      {...(shouldLoad && emojiSrc(unified))}
    />
  );
};

export default EmojiImg;

EmojiImg.propTypes = {
  unified: PropTypes.string,
  shouldLoad: PropTypes.bool,
  dispatch: PropTypes.func,
  native: PropTypes.bool,
};
