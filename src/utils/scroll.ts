export type ScrollElement = HTMLElement | Window;

function isWindow(val: unknown): val is Window {
  return val === window;
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
