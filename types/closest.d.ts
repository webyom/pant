declare module 'closest' {
  export default function closest(
    element: Element | EventTarget,
    selector: string,
    checkYoSelf?: boolean,
  ): Element | null;
}
