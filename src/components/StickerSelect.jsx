import React from 'react';
import '../styles/Stickers.sass';

const StickerSelect = ({ type }) => {
  return (
    <div id="stickers">
      <div className={`sticker ${type}`}>
        <div className="sticker-container">
          <div className="sticker-wrapper">
            <div className="sticker-clip">
              <div className="sticker-front"></div>
              <div className="sticker-back"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerSelect;
