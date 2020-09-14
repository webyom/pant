const MIN_DISTANCE = 10;

type TouchHandlerOptions = {
  onBeforeTouchStart?(event: TouchEvent): boolean | void;
  onTouchStart?(event: TouchEvent): void;
  onBeforeTouchMove?(event: TouchEvent): boolean | void;
  onTouchMove?(event: TouchEvent): void;
  onTouchEnd?(event: TouchEvent): void;
  onTouchCancel?(event: TouchEvent): void;
};

export type TouchDirection = 'horizontal' | 'vertical' | '';

export type TouchHandlerState = {
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  offsetX: number;
  offsetY: number;
  direction: TouchDirection;
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
  private direction: TouchDirection;

  constructor(el: HTMLElement, opt?: TouchHandlerOptions) {
    this.el = el;
    this.opt = opt || {};
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
    this.bindTouchEvent();
  }

  private getDirection(x: number, y: number): TouchDirection {
    if (x > y && x > MIN_DISTANCE) {
      return 'horizontal';
    }

    if (y > x && y > MIN_DISTANCE) {
      return 'vertical';
    }

    return '';
  }

  touchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.resetTouchState();
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  }

  touchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
    this.offsetX = Math.abs(this.deltaX);
    this.offsetY = Math.abs(this.deltaY);
    this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
  }

  private onTouchStart(event: TouchEvent): void {
    const { onBeforeTouchStart, onTouchStart } = this.opt;
    if (onBeforeTouchStart && onBeforeTouchStart(event) === false) {
      return;
    }
    this.touchStart(event);
    onTouchStart && onTouchStart(event);
  }

  private onTouchMove(event: TouchEvent): void {
    const { onBeforeTouchMove, onTouchMove } = this.opt;
    if (onBeforeTouchMove && onBeforeTouchMove(event) === false) {
      return;
    }
    this.touchMove(event);
    onTouchMove && onTouchMove(event);
  }

  private onTouchEnd(event: TouchEvent): void {
    const { onTouchEnd } = this.opt;
    onTouchEnd && onTouchEnd(event);
  }

  private onTouchCancel(event: TouchEvent): void {
    const { onTouchCancel } = this.opt;
    onTouchCancel && onTouchCancel(event);
  }

  private resetTouchState(): void {
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
