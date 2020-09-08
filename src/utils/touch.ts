const MIN_DISTANCE = 10;

function getDirection(x: number, y: number): string {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

export const PantTouch: any = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  direction: '',

  touchStart(event: any): void {
    this.resetTouchStatus();
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  },

  touchMove(event: any): void {
    const touch = event.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
    this.offsetX = Math.abs(this.deltaX);
    this.offsetY = Math.abs(this.deltaY);
    this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
  },

  resetTouchStatus(): void {
    this.direction = '';
    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  },

  bindTouchEvent(el: any): void {
    const { onTouchStart, onTouchMove, onTouchEnd, onTransitionEnd } = this;
    el.addEventListener('touchstart', onTouchStart.bind(this), false);
    el.addEventListener('touchmove', onTouchMove.bind(this), false);
    el.addEventListener('transitionend', onTransitionEnd.bind(this), false);

    if (onTouchEnd) {
      el.addEventListener('touchend', onTouchEnd.bind(this), false);
      el.addEventListener('touchcancel', onTouchEnd.bind(this), false);
    }
  },
};
