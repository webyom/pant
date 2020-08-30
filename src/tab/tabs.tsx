import * as preact from 'preact';
import clsx from 'clsx';
import { createBEM } from '../utils/bem';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { scrollLeftTo } from '../utils/scroll';
import { isDef, addUnit } from '../utils';
import { Title, TitleProps } from './title';
import './index.scss';

export type TabsProps = TitleProps & {
  activeIndex?: number | string;
  activeName?: string;
  bordered?: boolean;
  animated?: boolean;
  duration?: number | string;
  lineHeight?: number | string;
  lineWidth?: number | string;
  background?: string;
  navLeft?: preact.VNode;
  navRight?: preact.VNode;
};

type TabsState = {
  activeIndex: number;
};

const bem = createBEM('pant-tabs');

export class Tabs extends preact.Component<TabsProps, TabsState> {
  private tabListRef = preact.createRef<HTMLDivElement>();
  private lineRef = preact.createRef<HTMLDivElement>();

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
    const { activeName, children } = this.props;
    if (activeName) {
      const activeIndex = [].concat(children).findIndex(item => item.props.name === activeName);
      if (activeIndex >= 0) {
        this.setState({ activeIndex });
      }
    }
    this.updateLine(true);
    this.scrollIntoView(true);
  }

  componentDidUpdate(): void {
    this.updateLine();
    this.scrollIntoView();
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

  private onTitleClick(index: number): void {
    this.setState({ activeIndex: index });
  }

  private genNavs(): preact.JSX.Element {
    const props = this.props;
    const { type, color, bordered, scrollable, ellipsis, navLeft, navRight } = props;
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
    return wrap;
  }

  private warpAnimatedContents(contents: preact.ComponentChild): preact.ComponentChild {
    const props = this.props;
    if (props.animated) {
      const style = {
        transform: `translate3d(${-1 * 1 * 100}%, 0, 0)`,
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
    const { animated } = props;
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
          <div role="tabpanel" class={bem('pane')} style={{ display: isActive ? 'block' : 'none' }}>
            {children}
          </div>
        );
      }
    });
    const wrap = (
      <div class={bem('content', { animated: animated })}>
        {animated ? this.warpAnimatedContents(contents) : contents}
      </div>
    );
    return wrap;
  }

  render(): preact.JSX.Element {
    const { type } = this.props;
    return (
      <div className={bem([type])}>
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
