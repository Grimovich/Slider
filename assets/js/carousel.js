/* eslint-disable no-plusplus */
class Carousel {
  constructor(p) {
    const settings = {...{containerID: '#carousel', slideID: '.slide', interval: 2000, isPlaying: true}, ...p};

    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);

    this.isPlaying = settings.isPlaying;
    this.interval = settings.interval;
  }

  _initProps() {
    this.SLIDES_LENGTH = this.slideItems.length;
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-arrow-right"></i>';
    this.FA_NEXT = '<i class="fas fa-arrow-right"></i>';
    this.curentSlie = 0;
  }

  _initControls() {
    const controls = document.createElement('div');

    const PAUSE = `<div id="pause-btn" class="control control-pause">
                    <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                    <span id="fa-play-icon">${this.FA_PLAY}</span>
                   </div>`;
    const PREV = `<div id="prev-btn" class="control control-prev">${this.FA_PREV}</div>`;
    const NEXT = `<div id="next-btn" class="control control-next">${this.FA_NEXT}</div>`;

    controls.setAttribute('id', 'controls-container');
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');

    this.pauseIcon = this.container.querySelector('#fa-pause-icon');
    this.playIcon = this.container.querySelector('#fa-play-icon');

    this.isPlaying ? this._pauseVisible() : this._playVisible();
  }

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('id', 'indicators-container');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div');
      const iCont = document.createElement('i');

      indicator.setAttribute('class', i === 0 ? 'indicator active' : 'indicator');
      indicator.dataset.slideTo = `${i}`;
      iCont.setAttribute('class', 'fas fa-solid fa-minus');

      indicator.append(iCont);
      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('#indicators-container');
    this.indicatorItems = this.indicatorsContainer.querySelectorAll('.indicator');
  }

  _gotoNth(n) {
    this.slideItems[this.curentSlie].classList.toggle('active');
    this.indicatorItems[this.curentSlie].classList.toggle('active');
    this.curentSlie = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slideItems[this.curentSlie].classList.toggle('active');
    this.indicatorItems[this.curentSlie].classList.toggle('active');
  }

  _gotoNext() {
    this._gotoNth(this.curentSlie + 1);
  }

  _gotoPrev() {
    this._gotoNth(this.curentSlie - 1);
  }

  _tick(flag = true) {
    if (!flag) return;
    if (this.timerID) return;

    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  _pauseHandler() {
    if (this.isPlaying) {
      // this.pauseBtn.innerHTML = this.FA_PLAY;
      this._playVisible();
      this.isPlaying = false;
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }

  _playHandler() {
    this._tick();
    // this.pauseBtn.innerHTML = this.FA_PAUSE;
    this._pauseVisible();
    this.isPlaying = true;
  }

  _pausePlayHandler() {
    if (this.isPlaying) {
      this._pauseHandler();
    } else {
      this._playHandler();
    }
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      this._pauseHandler();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_SPACE) this._pausePlayHandler();
  }

  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.opacity = isVisible ? 1 : 0;
    this.playIcon.style.opacity = !isVisible ? 1 : 0;
  }

  _playVisible() {
    this._pauseVisible(false);
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this._pausePlayHandler.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    this.container.addEventListener('mouseenter', this._pauseHandler.bind(this));
    this.container.addEventListener('mouseleave', this._playHandler.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  prev() {
    this._gotoPrev();
    this._pauseHandler();
  }

  next() {
    this._gotoNext();
    this._pauseHandler();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
}

export default Carousel;
