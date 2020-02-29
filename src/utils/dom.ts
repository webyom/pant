export function removeNode(el: Node): void {
  const parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}
