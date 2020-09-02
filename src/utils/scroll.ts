export type ScrollElement = HTMLElement | Window;

function isWindow(val: unknown): val is Window {
  return val === window;
}

// get nearest scroll element
// http://w3help.org/zh-cn/causes/SD9013
// http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
const overflowScrollReg = /scroll|auto/i;
export function getScroller(el: HTMLElement, root: ScrollElement = window): ScrollElement {
  let node = el;

  while (node && node.tagName !== 'HTML' && node.nodeType === 1 && node !== root) {
    const { overflowY } = getComputedStyle(node);

    if (overflowScrollReg.test(overflowY)) {
      if (node.tagName !== 'BODY') {
        return node;
      }

      // see: https://github.com/youzan/vant/issues/3823
      const { overflowY: htmlOverflowY } = getComputedStyle(node.parentNode as Element);

      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode as HTMLElement;
  }

  return root;
}

export function isRootScroller(el: ScrollElement): boolean {
  if (el === window) {
    return true;
  }
  const tagName = (el as HTMLElement).tagName;
  return tagName === 'BODY' || tagName === 'HTML';
}

export function getScrollTop(el: ScrollElement): number {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}

export function setScrollTop(el: ScrollElement, value: number): void {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop(): number {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function setRootScrollTop(value: number): void {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}

// get distance from element top to page top
export function getElementTop(el: ScrollElement): number {
  if (isWindow(el)) {
    return 0;
  }
  return el.getBoundingClientRect().top + getRootScrollTop();
}

export function getVisibleHeight(el: ScrollElement): number {
  if (isWindow(el)) {
    return el.innerHeight;
  }
  return el.getBoundingClientRect().height;
}

export function getVisibleTop(el: ScrollElement): number {
  if (isWindow(el)) {
    return 0;
  }
  return el.getBoundingClientRect().top;
}

export function getVisibleBottom(el: ScrollElement): number {
  if (isWindow(el)) {
    return 0;
  }
  return el.getBoundingClientRect().bottom;
}

export function scrollLeftTo(scroller: HTMLElement, to: number, duration: number): void {
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
  const step = (to - from) / frames;

  function animate(): void {
    scroller.scrollLeft += step;

    if (++count < frames) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

export function scrollTopTo(scroller: HTMLElement, to: number, duration: number, callback: Function): void {
  let current = getScrollTop(scroller);

  const isDown = current < to;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
  const step = (to - current) / frames;

  function animate(): void {
    current += step;

    if ((isDown && current > to) || (!isDown && current < to)) {
      current = to;
    }

    setScrollTop(scroller, current);

    if ((isDown && current < to) || (!isDown && current > to)) {
      requestAnimationFrame(animate);
    } else if (callback) {
      requestAnimationFrame(callback as FrameRequestCallback);
    }
  }

  animate();
}
