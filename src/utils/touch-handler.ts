const MIN_DISTANCE = 10;

type TouchHandlerOptions = {
  onTouchStart?(event: TouchEvent): void;
  onTouchMove?(event: TouchEvent): void;
  onTouchEnd?(event: TouchEvent): void;
  onTouchCancel?(event: TouchEvent): void;
};

type TouchHandlerState = {
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  offsetX: number;
  offsetY: number;
  direction: string;
};

export class TouchHandler {
  private el: HTMLElement;
  private opt: TouchHandlerOptions;
  private startX = 0;
  private startY = 0;
  private deltaX = 0;
  private deltaY = 0;
  private offsetX = 0;
  private offsetY = 0;
  private direction = '';

  constructor(el: HTMLElement, opt?: TouchHandlerOptions) {
    this.el = el;
    this.opt = opt || {};
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
    this.bindTouchEvent();
  }

  private getDirection(x: number, y: number): string {
    if (x > y && x > MIN_DISTANCE) {
      return 'horizontal';
    }

    if (y > x && y > MIN_DISTANCE) {
      return 'vertical';
    }

    return '';
  }

  private onTouchStart(event: TouchEvent): void {
    this.resetTouchStatus();
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.opt.onTouchStart && this.opt.onTouchStart(event);
  }

  private onTouchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
    this.offsetX = Math.abs(this.deltaX);
    this.offsetY = Math.abs(this.deltaY);
    this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
    this.opt.onTouchMove && this.opt.onTouchMove(event);
  }

  private onTouchEnd(event: TouchEvent): void {
    this.opt.onTouchEnd && this.opt.onTouchEnd(event);
  }

  private onTouchCancel(event: TouchEvent): void {
    this.opt.onTouchCancel && this.opt.onTouchCancel(event);
  }

  private resetTouchStatus(): void {
    this.direction = '';
    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  private bindTouchEvent(): void {
    this.el.addEventListener('touchstart', this.onTouchStart, false);
    this.el.addEventListener('touchmove', this.onTouchMove, false);
    this.el.addEventListener('touchend', this.onTouchEnd, false);
    this.el.addEventListener('touchcancel', this.onTouchCancel, false);
  }

  get state(): TouchHandlerState {
    return {
      startX: this.startX,
      startY: this.startY,
      deltaX: this.deltaX,
      deltaY: this.deltaY,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      direction: this.direction,
    };
  }

  destroy(): void {
    this.el.removeEventListener('touchstart', this.onTouchStart);
    this.el.removeEventListener('touchmove', this.onTouchMove);
    this.el.removeEventListener('touchend', this.onTouchEnd);
    this.el.removeEventListener('touchcancel', this.onTouchCancel);
    this.el = null;
  }
}