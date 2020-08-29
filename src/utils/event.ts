import { pantConfig } from '../';

const isServer = pantConfig('isServer');

export let supportsPassive = false;

if (!isServer) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {
    //
  }
}

export function on(
  target: EventTarget,
  event: string,
  handler: EventListenerOrEventListenerObject,
  passive = false,
): void {
  if (!isServer) {
    target.addEventListener(event, handler, supportsPassive ? { capture: false, passive } : false);
  }
}

export function off(target: EventTarget, event: string, handler: EventListenerOrEventListenerObject): void {
  if (!isServer) {
    target.removeEventListener(event, handler);
  }
}

export function stopPropagation(event: Event): void {
  event.stopPropagation();
}

export function preventDefault(event: Event): void {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }
}

export function preventDefaultAndStopPropagation(event: Event): void {
  preventDefault(event);
  stopPropagation(event);
}
