window.onload = () => {
  window.onscroll = function (e) {
    let winY = window.scrollY;
    if (winY > 300) {
      progressBar();

      scrollbarAnimation();

      winY = null;
    }
  };

  const scrollBtn = document.querySelector('.isShowBtn');

  window.onscroll = () => {
    if (window.scrollY > 700) {
      scrollBtn.classList.remove('isShowBtn-hidden');
    }else if(window.scrollY < 700) {
      scrollBtn.classList.add('isShowBtn-hidden');
    }
  };

    scrollBtn.onclick = () => {
      window.scroll(0, 0);
    }

  };  