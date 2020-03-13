import * as preact from 'preact';
import clsx from 'clsx';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import { getVisibleHeight, getVisibleTop, getVisibleBottom } from '../utils/scroll';

export type LazyloadProps = {
  width?: number | string;
  height?: number | string;
  preloadOffset?: number;
  inline?: boolean;
  className?: string;
  customStyle?: Record<string, string | number>;
  children?: preact.ComponentChildren;
  scroller?: HTMLElement | Window;
};

type LazyloadState = {
  loaded: boolean;
};

const bem = createBEM('pant-lazyload');

export class Lazyload extends preact.Component<LazyloadProps, LazyloadState> {
  state = {
    loaded: false,
  };

  placeholder: HTMLElement = null;

  bindedSetPlaceholder = this.setPlaceholder.bind(this);
  bindedOnScroll = this.onScroll.bind(this);

  private setPlaceholder(el: HTMLElement): void {
    this.placeholder = el;
  }

  private onScroll(): void {
    const { preloadOffset, scroller } = this.props;
    const placeholder = this.placeholder;
    const isWindowScroller = window === scroller;
    const scrollerTop = isWindowScroller ? 0 : getVisibleTop(scroller);
    const scrollerBottom = isWindowScroller ? getVisibleHeight(window) : getVisibleBottom(scroller);
    const placeholderTop = getVisibleTop(placeholder) - preloadOffset;
    const placeholderBottom = getVisibleBottom(placeholder) + preloadOffset;
    if (
      (placeholderTop >= scrollerTop && placeholderTop <= scrollerBottom) ||
      (placeholderBottom >= scrollerTop && placeholderBottom <= scrollerBottom) ||
      (placeholderTop <= scrollerTop && placeholderBottom >= scrollerBottom)
    ) {
      scroller.removeEventListener('scroll', this.bindedOnScroll);
      this.setState({ loaded: true });
    }
  }

  componentDidMount(): void {
    this.props.scroller.addEventListener('scroll', this.bindedOnScroll, { passive: true });
    this.onScroll();
  }

  componentWillUnmount(): void {
    this.props.scroller.removeEventListener('scroll', this.bindedOnScroll);
  }

  render(): preact.JSX.Element {
    const props = this.props;

    if (this.state.loaded) {
      return <preact.Fragment>{props.children}</preact.Fragment>;
    }

    const style: Record<string, string> = {
      ...props.customStyle,
      width: addUnit(props.width),
      height: addUnit(props.height),
    };

    if (props.inline) {
      style.display = 'inline-block';
    }

    return <div ref={this.bindedSetPlaceholder} className={clsx(bem(), props.className)} style={style}></div>;
  }
}

Lazyload.defaultProps = {
  preloadOffset: 0,
  scroller: window,
};
