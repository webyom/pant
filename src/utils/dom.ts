export function removeNode(el: Node): void {
  const parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}

export function isHidden(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el);
  const hidden = style.display === 'none';

  // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed
  const parentHidden = el.offsetParent === null && style.position !== 'fixed';

  return hidden || parentHidden;
}
