import * as preact from 'preact';
import clsx from 'clsx';
import { createBEM } from '../utils/bem';
import { preventDefaultAndStopPropagation } from '../utils/event';
import { PantTouch } from '../utils/touch';
import { range } from '../utils/number';
import { MOMENTUM_LIMIT_TIME, DEFAULT_DURATION, MOMENTUM_LIMIT_DISTANCE } from './constant';
import './index.scss';

function getElementTranslateY(element: HTMLUListElement): number {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(', ')[5];

  return Number(translateY);
}
export type PickerProps = {
  visibleItemCount: number;
  options: string[];
  className?: string;
  itemHeight?: number;
  defaultValue?: string;
  onChange?: (value: number) => void;
  swipeDuration?: number;
  injectChildren?: Function;
  disabledValue?: string;
};

type PickerState = {
  offset: number;
  baseOffset: number;
  duration: number;
  moving: boolean;
  prevOptions: string[];
  prevDefaultValue: string;
};

const bem = createBEM('pant-picker-column');

export class PickerColumn extends preact.Component<PickerProps, PickerState> {
  private ele: HTMLUListElement;
  private transitionEndTrigger: any;
  bindTouchEvent: Function;
  startOffset: number;
  touchMove: Function;
  direction: string;
  deltaY: number;
  touchStartTime: number;
  momentumOffset: number;
  touchStart: Function;

  constructor(props: PickerProps) {
    super(props);
    this.state = {
      offset: 0,
      duration: 0,
      baseOffset: (this.props.itemHeight * (this.props.visibleItemCount - 1)) / 2,
      moving: false,
      prevOptions: [],
      prevDefaultValue: '',
    };
    Object.assign(this, PantTouch);
    this.setIndex = this.setIndex.bind(this);
  }

  componentDidMount(): void {
    this.props.injectChildren(this);
    this.bindTouchEvent(this.ele);
  }

  static getDerivedStateFromProps(nextProps: PickerProps, state: PickerState): PickerState {
    const { options, defaultValue, itemHeight } = nextProps;
    if (options !== state.prevOptions || defaultValue !== state.prevDefaultValue) {
      return {
        ...state,
        offset: -options.indexOf(defaultValue) * itemHeight,
        prevOptions: options,
        prevDefaultValue: defaultValue,
      };
    }
  }

  onClickItem(index: number): void {
    if (this.state.moving) {
      return;
    }

    this.transitionEndTrigger = null;
    this.setState({
      duration: DEFAULT_DURATION,
    });
    this.setIndex(index);
  }

  // 校正index，使其跳过不可选
  adjustIndex(index: number): number {
    const length = this.props.options.length;
    index = range(index, 0, length);
    for (let i = index; i < length; i++) {
      if (this.props.options[i] !== this.props.disabledValue) return i;
    }

    for (let i = index - 1; i >= 0; i--) {
      if (this.props.options[i] !== this.props.disabledValue) return i;
    }
  }

  // 点击后修改offset，调整列表位置
  setIndex(index: number): void {
    const props = this.props;
    index = this.adjustIndex(index);
    if (index === undefined) {
      return;
    }
    const offset = -index * props.itemHeight;

    const trigger = (): void => {
      props.onChange(index);
    };
    // trigger the change event after transitionend when moving
    if (this.state.moving && offset !== this.state.offset) {
      this.transitionEndTrigger = trigger;
    } else {
      trigger();
    }
    this.setState({
      offset,
    });
  }

  getIndexByOffset(offset: number): number {
    return range(Math.round(-offset / this.props.itemHeight), 0, this.props.options.length - 1);
  }

  onTouchStart(event: Event): void {
    this.touchStart(event);
    if (this.state.moving) {
      const translateY = getElementTranslateY(this.ele);
      this.setState(
        {
          offset: Math.min(0, translateY - this.state.baseOffset),
        },
        () => {
          this.startOffset = this.state.offset;
        },
      );
    } else {
      this.startOffset = this.state.offset;
    }

    this.setState({
      duration: 0,
    });
    this.transitionEndTrigger = null;
    this.touchStartTime = Date.now();
    this.momentumOffset = this.startOffset;
  }

  onTouchMove(event: Event): void {
    this.touchMove(event);

    if (this.direction === 'vertical') {
      this.setState({
        moving: true,
      });
      preventDefaultAndStopPropagation(event);
    }

    this.setState({
      offset: range(
        this.startOffset + this.deltaY,
        -(this.props.options.length * this.props.itemHeight),
        this.props.itemHeight,
      ),
    });

    const now = Date.now();
    if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
      this.touchStartTime = now;
      this.momentumOffset = this.state.offset;
    }
  }

  onTouchEnd(): void {
    const distance = this.state.offset - this.momentumOffset;
    const duration = Date.now() - this.touchStartTime;
    const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
    if (allowMomentum) {
      this.momentum(distance, duration);
      return;
    }
    this.setState({
      duration: DEFAULT_DURATION,
    });

    // 划出边界处理
    const index = this.getIndexByOffset(this.state.offset);
    this.setIndex(index);
    // compatible with desktop scenario
    // use setTimeout to skip the click event triggered after touchstart
    setTimeout(() => {
      this.setState({
        moving: false,
      });
    }, 0);
  }

  // 滑动惯性
  momentum(distance: number, duration: number): void {
    const speed = Math.abs(distance / duration);

    distance = this.state.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);

    const index = this.getIndexByOffset(distance);

    this.setState({
      duration: +this.props.swipeDuration,
    });
    this.setIndex(index);
  }

  genOptions(): any {
    const { options, defaultValue, itemHeight, disabledValue } = this.props;
    const optionStyle = {
      height: `${itemHeight}px`,
    };

    return options.map((value: string, index: number) => {
      const data = {
        style: optionStyle,
        className: clsx(
          bem('item', {
            disabled: value === disabledValue,
            selected: value === defaultValue,
          }),
        ),
        onClick: (): void => {
          this.onClickItem(index);
        },
      };

      const childData = {
        className: 'pant-ellipsis',
      };
      return (
        <li {...data}>
          <div {...childData}>{value}</div>
        </li>
      );
    });
  }

  onTransitionEnd(): void {
    this.stopMomentum();
  }

  stopMomentum(): void {
    this.setState({
      moving: false,
      duration: 0,
    });
    if (this.transitionEndTrigger) {
      this.transitionEndTrigger();
      this.transitionEndTrigger = null;
    }
  }

  render(): preact.JSX.Element {
    const { offset, baseOffset, duration } = this.state;
    const wrapperStyle = {
      transform: `translate3d(0, ${offset + baseOffset}px, 0)`,
      transitionDuration: `${duration}ms`,
      transitionProperty: duration ? 'all' : 'none',
    };
    return (
      <div className={clsx(bem(), this.props.className)}>
        <ul
          ref={(el: HTMLUListElement): void => {
            this.ele = el;
          }}
          style={wrapperStyle}
          className={bem('wrapper')}
        >
          {this.genOptions()}
        </ul>
      </div>
    );
  }
}
