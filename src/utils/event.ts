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
