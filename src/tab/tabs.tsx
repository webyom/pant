import * as preact from 'preact';
import clsx from 'clsx';
import { createBEM } from '../utils/bem';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import {
  scrollLeftTo,
  scrollTopTo,
  setRootScrollTop,
  getElementTop,
  getVisibleTop,
  getScroller,
  getVisibleHeight,
  ScrollElement,
} from '../utils/scroll';
import { isDef, addUnit } from '../utils';
import { on, off } from '../utils/event';
import { TouchHandler } from '../utils/touch-handler';
import { Sticky } from '../sticky';
import { Title, TitleParentProps, TitleProps } from './title';
import './index.scss';

const MIN_SWIPE_DISTANCE = 50;

export type TabsProps = TitleParentProps & {
  activeIndex?: number | string;
  activeName?: string;
  bordered?: boolean;
  animated?: boolean;
  swipeable?: boolean;
  sticky?: boolean;
  scrollspy?: boolean;
  duration?: number | string;
  lineHeight?: number | string;
  lineWidth?: number | string;
  background?: string;
  navLeft?: preact.VNode;
  navRight?: preact.VNode;
  onClick?(event: Event, info: TabInfo): void;
  onBeforeChange?(info: TabInfo): Promise<boolean>;
};

type TabsState = {
  activeIndex: number;
};

export type TabInfo = {
  index: number;
  title: string;
  name?: string;
  disabled?: boolean;
};

const bem = createBEM('pant-tabs');

export class Tabs extends preact.Component<TabsProps, TabsState> {
  private containerRef = preact.createRef<HTMLDivElement>();
  private tabListRef = preact.createRef<HTMLDivElement>();
  private contentRef = preact.createRef<HTMLDivElement>();
  private lineRef = preact.createRef<HTMLDivElement>();
  private stickyRef = preact.createRef<Sticky>();
  private touchHandler: TouchHandler;
  private scroller: ScrollElement;
  private bindedOnScroll = this.onScroll.bind(this);
  private lockScroll: boolean;
  private tabHeight: number;

  constructor(props: preact.RenderableProps<TabsProps>) {
    super(props);
    const { activeName, children } = props;
    let activeIndex;
    if (activeName) {
      activeIndex = [].concat(children).findIndex(item => item.props.name === activeName);
    } else {
      activeIndex = +props.activeIndex;
    }
    this.state = {
      activeIndex: activeIndex >= 0 ? activeIndex : 0,
    };
  }

  componentDidMount(): void {
    const { activeName, children, swipeable, scrollspy } = this.props;
    this.tabHeight = getVisibleHeight(this.tabListRef.current.parentNode as HTMLElement);
    if (activeName) {
      const activeIndex = [].concat(children).findIndex(item => item.props.name === activeName);
      if (activeIndex >= 0) {
        this.setState({ activeIndex });
      }
    }
    this.updateLine(true);
    this.scrollIntoView(true);
    if (swipeable) {
      this.touchHandler = new TouchHandler(this.contentRef.current, { onTouchEnd: this.onTouchEnd.bind(this) });
    }
    if (scrollspy) {
      this.scroller = getScroller(this.containerRef.current);
      on(this.scroller, 'scroll', this.bindedOnScroll);
      this.onScroll();
    }
  }

  componentDidUpdate(): void {
    this.updateLine();
    this.scrollIntoView();
  }

  componentWillUnmount(): void {
    if (this.props.swipeable) {
      this.touchHandler.destroy();
      this.touchHandler = null;
    }
    if (this.scroller) {
      off(this.scroller, 'scroll', this.bindedOnScroll);
      this.scroller = null;
    }
  }

  private getCurrentIndexOnScroll(): number {
    const children = this.containerRef.current.querySelectorAll('.pant-tabs__pane');

    for (let index = 0; index < children.length; index++) {
      const top = getVisibleTop(children[index] as HTMLElement);
      const scrollOffset = this.props.sticky ? this.tabHeight : 0;

      if (top > scrollOffset) {
        return index === 0 ? 0 : index - 1;
      }
    }

    return children.length - 1;
  }

  private onScroll(): void {
    if (this.props.scrollspy && !this.lockScroll) {
      const index = this.getCurrentIndexOnScroll();
      this.setActiveIndex(index);
    }
  }

  private onTouchEnd(): void {
    const { activeIndex } = this.state;
    const { direction, offsetX, deltaX } = this.touchHandler.state;
    if (direction === 'horizontal' && offsetX >= MIN_SWIPE_DISTANCE) {
      if (deltaX > 0 && activeIndex !== 0) {
        this.setActiveIndex(activeIndex - 1);
      } else if (deltaX < 0 && activeIndex !== [].concat(this.props.children).length - 1) {
        this.setActiveIndex(activeIndex + 1);
      }
    }
  }

  private scrollIntoView(immediate?: boolean): void {
    const { type, scrollable, duration } = this.props;
    if (type !== 'line' || !scrollable) {
      return;
    }
    const tabListEl = this.tabListRef.current;
    const activeTitleEl = tabListEl.querySelector('.pant-tab--active') as HTMLElement;
    if (!activeTitleEl) {
      return;
    }
    const to = activeTitleEl.offsetLeft - (tabListEl.offsetWidth - activeTitleEl.offsetWidth) / 2;
    scrollLeftTo(tabListEl, to, immediate ? 0 : +duration);
  }

  private updateLine(immediate?: boolean): void {
    const { type, lineWidth, lineHeight, duration } = this.props;
    if (type !== 'line') {
      return;
    }
    const lineEl = this.lineRef.current;
    const activeTitleEl = this.tabListRef.current.querySelector('.pant-tab--active') as HTMLElement;
    if (!activeTitleEl) {
      return;
    }
    const width = isDef(lineWidth) ? lineWidth : activeTitleEl.offsetWidth / 2;
    const left = activeTitleEl.offsetLeft + activeTitleEl.offsetWidth / 2;
    lineEl.style.width = addUnit(width);
    lineEl.style.transform = `translateX(${left}px) translateX(-50%)`;
    if (!immediate) {
      lineEl.style.transitionDuration = `${duration}s`;
    }
    if (isDef(lineHeight)) {
      const height = addUnit(lineHeight);
      lineEl.style.height = height;
      lineEl.style.borderRadius = height;
    }
  }

  private setActiveIndex(index: number): void {
    if (this.state.activeIndex === index) {
      return;
    }
    this.setState({ activeIndex: index }, () => {
      const { sticky, scrollspy } = this.props;
      if (!scrollspy && sticky && this.stickyRef.current.fixed) {
        setRootScrollTop(Math.ceil(getElementTop(this.containerRef.current)));
      }
    });
  }

  private scrollToContent(index: number, immediate = false): void {
    const { scrollspy, sticky, duration } = this.props;
    if (scrollspy) {
      const el = this.containerRef.current.querySelectorAll('.pant-tabs__pane')[index] as HTMLElement;

      if (el) {
        const scrollOffset = sticky ? this.tabHeight : 0;
        const to = getElementTop(el, this.scroller as HTMLElement) - scrollOffset;

        this.lockScroll = true;
        scrollTopTo(this.scroller, to, immediate ? 0 : +duration, () => {
          this.lockScroll = false;
        });
      }
    }
  }

  private async onTitleClick(index: number, evt: Event, props: TitleProps): Promise<void> {
    const { onClick, onBeforeChange } = this.props;
    const tabInfo = { index, title: props.title, name: props.name, disabled: props.disabled };
    if (!props.disabled) {
      if (onBeforeChange) {
        if (await onBeforeChange(tabInfo)) {
          this.setActiveIndex(index);
        }
      } else {
        this.setActiveIndex(index);
      }
      this.scrollToContent(index);
    }
    onClick && onClick(evt, tabInfo);
  }

  private genNavs(): preact.JSX.Element {
    const props = this.props;
    const { type, color, bordered, scrollable, sticky, ellipsis, navLeft, navRight } = props;
    const navStyle = {
      borderColor: props.color,
      background: props.background,
    };
    const lineStyle = {
      backgroundColor: color,
    };
    const navs = [].concat(props.children).map((item, index) => {
      const itemProps = item.props;
      return (
        <Title
          type={type}
          dot={itemProps.dot}
          info={itemProps.info}
          title={itemProps.title}
          titleNode={itemProps.titleNode}
          name={itemProps.name}
          color={color}
          isActive={index === this.state.activeIndex}
          ellipsis={props.ellipsis}
          disabled={itemProps.disabled}
          scrollable={scrollable}
          activeColor={props.activeColor}
          inactiveColor={props.inactiveColor}
          swipeThreshold={props.swipeThreshold}
          onClick={this.onTitleClick.bind(this, index)}
        />
      );
    });
    const wrap = (
      <div className={clsx(bem('wrap', { scrollable }), { [BORDER_TOP_BOTTOM]: type === 'line' && bordered })}>
        <div ref={this.tabListRef} role="tablist" class={bem('nav', [type, { complete: !ellipsis }])} style={navStyle}>
          {navLeft}
          {navs}
          {type === 'line' && <div ref={this.lineRef} class={bem('line')} style={lineStyle} />}
          {navRight}
        </div>
      </div>
    );
    return sticky ? (
      <Sticky ref={this.stickyRef} container={this.containerRef}>
        {wrap}
      </Sticky>
    ) : (
      wrap
    );
  }

  private warpAnimatedContents(contents: preact.ComponentChild): preact.ComponentChild {
    const props = this.props;
    if (props.animated) {
      const style = {
        transform: `translate3d(${-1 * this.state.activeIndex * 100}%, 0, 0)`,
        transitionDuration: `${props.duration}s`,
      };
      return (
        <div class={bem('track')} style={style}>
          {contents}
        </div>
      );
    }
    return contents;
  }

  private genContents(): preact.JSX.Element {
    const props = this.props;
    const { animated, scrollspy } = props;
    const contents = [].concat(props.children).map((item, index) => {
      const { children } = item.props;
      const isActive = this.state.activeIndex === index;
      if (animated) {
        return (
          <div role="tabpanel" aria-hidden={!isActive} class={bem('pane-wrapper', { inactive: !isActive })}>
            <div class={bem('pane')}>{children}</div>
          </div>
        );
      } else {
        return (
          <div role="tabpanel" class={bem('pane')} style={{ display: scrollspy || isActive ? 'block' : 'none' }}>
            {children}
          </div>
        );
      }
    });
    const wrap = (
      <div ref={this.contentRef} class={bem('content', { animated: animated })}>
        {animated ? this.warpAnimatedContents(contents) : contents}
      </div>
    );
    return wrap;
  }

  render(): preact.JSX.Element {
    const { type } = this.props;
    return (
      <div ref={this.containerRef} className={bem([type])}>
        {this.genNavs()}
        {this.genContents()}
      </div>
    );
  }
}

Tabs.defaultProps = {
  type: 'line',
  bordered: true,
  activeIndex: 0,
  duration: 0.3,
};
