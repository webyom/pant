import * as preact from 'preact';
import { isDef, addUnit, removeUnit } from '../utils';
import { isHidden } from '../utils/dom';
import { on, off } from '../utils/event';
import { getRootScrollTop, getElementTop, getScroller, ScrollElement, isRootScroller } from '../utils/scroll';
import { createBEM } from '../utils/bem';
import './index.scss';

export type StickyProps = {
  keepWidth?: boolean;
  zIndex?: number | string;
  offsetTop?: number | string;
  container?: preact.RefObject<HTMLElement>;
};

type StickyState = {
  fixed: boolean;
  height: number;
  left: number;
  right: number;
  transform: number;
};

const bem = createBEM('pant-sticky');

export class Sticky extends preact.Component<StickyProps, StickyState> {
  private domRef = preact.createRef<HTMLDivElement>();
  private bindedOnScroll = this.onScroll.bind(this);
  private scroller: ScrollElement;

  state = {
    fixed: false,
    height: 0,
    left: 0,
    right: 0,
    transform: 0,
  };

  componentDidMount(): void {
    const el = this.domRef.current;
    this.scroller = getScroller(el);
    if (isRootScroller(this.scroller)) {
      on(this.scroller, 'scroll', this.bindedOnScroll);
      this.onScroll();
    }
  }

  componentWillUnmount(): void {
    if (isRootScroller(this.scroller)) {
      off(this.scroller, 'scroll', this.bindedOnScroll);
    }
  }

  private getStyle(): Record<string, string | number> {
    const { keepWidth, zIndex, offsetTop } = this.props;
    const { left, right, fixed, transform } = this.state;

    if (!fixed) {
      return;
    }

    const style: Record<string, string | number> = {};

    if (isDef(zIndex)) {
      style.zIndex = zIndex;
    }

    if (offsetTop && fixed) {
      style.top = addUnit(offsetTop);
    }

    if (keepWidth) {
      style.left = addUnit(left);
      style.right = addUnit(right);
    }

    if (transform) {
      style.transform = `translate3d(0, ${transform}px, 0)`;
    }

    return style;
  }

  get fixed(): boolean {
    return this.state.fixed;
  }

  onScroll(): void {
    const el = this.domRef.current;
    if (isHidden(el)) {
      return;
    }

    const { left, right, width } = el.getBoundingClientRect();
    const height = el.offsetHeight;
    let fixed = false;
    let transform = 0;

    const { container, offsetTop } = this.props;
    const offsetTopNumber = removeUnit(offsetTop);
    const scrollTop = getRootScrollTop();
    const topToPageTop = getElementTop(el);

    // The sticky component should be kept inside the container element
    if (container) {
      const containerEl = container.current;
      const bottomToPageTop = topToPageTop + containerEl.offsetHeight;

      if (scrollTop + offsetTopNumber + height > bottomToPageTop) {
        const distanceToBottom = height + scrollTop - bottomToPageTop;

        if (distanceToBottom < height) {
          fixed = true;
          transform = -(distanceToBottom + offsetTopNumber);
        }
        this.setState({ height, left, right: right - width, fixed, transform });
        return;
      }
    }

    if (scrollTop + offsetTopNumber > topToPageTop) {
      fixed = true;
    }
    this.setState({ height, left, right: right - width, fixed, transform });
  }

  render(): preact.JSX.Element {
    const props = this.props;

    const { fixed, height } = this.state;
    const warpperStyle = {
      height: fixed ? `${height}px` : null,
    };

    return (
      <div ref={this.domRef} style={warpperStyle}>
        <div class={bem({ fixed })} style={this.getStyle()}>
          {props.children}
        </div>
      </div>
    );
  }
}

Sticky.defaultProps = {
  keepWidth: true,
  offsetTop: 0,
};
