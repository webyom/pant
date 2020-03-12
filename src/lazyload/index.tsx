import * as preact from 'preact';
import clsx from 'clsx';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import { getVisibleHeight, getVisibleTop } from '../utils/scroll';

export type LazyloadProps = {
  width?: number | string;
  height?: number | string;
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
    const scroller = this.props.scroller;
    const placeholder = this.placeholder;
    if (window === scroller) {
      const rootHeight = getVisibleHeight(window);
      const height = getVisibleHeight(placeholder);
      const top = getVisibleTop(placeholder);
      const bottom = top + height;
      if ((top > 0 && top < rootHeight) || (bottom > 0 && bottom < rootHeight)) {
        scroller.removeEventListener('scroll', this.bindedOnScroll);
        this.setState({ loaded: true });
      }
    } else {
      const scrollerTop = getVisibleTop(scroller);
      const scrollerHeight = getVisibleHeight(scroller);
      const scrollerBottom = scrollerTop + scrollerHeight;
      const placeholderTop = getVisibleTop(placeholder);
      const placeholderHeight = getVisibleHeight(placeholder);
      const placeholderBottom = placeholderTop + placeholderHeight;
      if (
        (placeholderTop > scrollerTop && placeholderTop < scrollerBottom) ||
        (placeholderBottom > scrollerTop && placeholderBottom < scrollerBottom)
      ) {
        scroller.removeEventListener('scroll', this.bindedOnScroll);
        this.setState({ loaded: true });
      }
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
  scroller: window,
};
