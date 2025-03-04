import '../styles/Stickers.sass';

const stickers = document.querySelector('#stickers');
const sticker  = stickers.querySelectorAll('.sticker');

if ('ontouchstart' in window) {

  stickers.classList.add('touch');

  for (var i = 0; i < sticker.length; i++) {
    sticker[i].onclick = function() {
      for (var j =0; j < sticker.length; j++) {
        sticker[j].classList.remove('peeled');
      }
      this.classList.add('peeled');
    };
  }

} else {

  stickers.classList.add('hover');

}