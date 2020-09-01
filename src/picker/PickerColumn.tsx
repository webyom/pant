import * as preact from 'preact';
import clsx from 'clsx';
import { isObject } from '../utils';
import { createBEM } from '../utils/bem';
import { deepClone } from '../utils/deep-clone';
import { preventDefaultAndStopPropagation } from '../utils/event';
import { PantTouch } from '../utils/touch';
import { range } from '../utils/number';
import { MOMENTUM_LIMIT_TIME, DEFAULT_DURATION, MOMENTUM_LIMIT_DISTANCE } from './constant';
import './index.scss';

function getElementTranslateY(element): number {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(', ')[5];

  return Number(translateY);
}
export type PickerProps = {
  visibleItemCount: number;
  initialOptions: {
    type: [];
    default: () => [];
  };
  className?: string;
  itemHeight?: number;
  valueKey?: string;
  defaultIndex?: number;
  onChange?: (value: number) => void;
  allowHtml?: boolean;
  swipeDuration?: number;
  injectChildren?: Function;
};

type PickerState = {
  options: any;
  currentIndex: number;
  offset: number;
  baseOffset: number;
  duration: number;
  moving: boolean;
};

const bem = createBEM('pant-picker-column');

function isOptionDisabled(option): boolean {
  return isObject(option) && option.disabled;
}

export class PickerColumn extends preact.Component<PickerProps, PickerState> {
  private ele: any;
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
      options: deepClone(props.initialOptions) || [],
      currentIndex: props.defaultIndex,
      offset: 0,
      duration: 0,
      baseOffset: (this.props.itemHeight * (this.props.visibleItemCount - 1)) / 2,
      moving: false,
    };
    Object.assign(this, PantTouch);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount(): void {
    this.props.injectChildren(this);
    this.bindTouchEvent(this.ele);
    this.setIndex(this.state.currentIndex);
  }

  // 重置cascade下一级的index为0
  setOptions(options): void {
    if (JSON.stringify(options) !== JSON.stringify(this.state.options)) {
      this.setState({
        options: deepClone(options),
      });
      this.setIndex(this.props.defaultIndex);
    }
  }

  // 默认valueKey是text，ul中展示text属性对应的值
  getOptionText(option): any {
    const props = this.props;
    if (isObject(option) && props.valueKey in option) {
      return option[props.valueKey];
    }
    return option;
  }

  onClickItem(index): void {
    if (this.state.moving) {
      return;
    }

    this.transitionEndTrigger = null;
    this.setState({
      duration: DEFAULT_DURATION,
    });
    this.setIndex(index, true);
  }

  // 获取当前选中行
  getValue(): any {
    return this.state.options[this.state.currentIndex];
  }

  setValue(value): void {
    const { options } = this.state;
    for (let i = 0; i < options.length; i++) {
      if (this.getOptionText(options[i]) === value) {
        return this.setIndex(i);
      }
    }
  }

  setIndex(index, emitChange?: boolean): void {
    const props = this.props;
    const { currentIndex } = this.state;
    index = this.adjustIndex(index) || 0;

    const offset = -index * props.itemHeight;

    const trigger = (): void => {
      if (index !== currentIndex) {
        this.setState(
          {
            currentIndex: index,
          },
          () => {
            if (emitChange) {
              props.onChange(index);
            }
          },
        );
      }
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

  getIndexByOffset(offset): number {
    return range(Math.round(-offset / this.props.itemHeight), 0, this.state.options.length - 1);
  }

  onTouchStart(event): void {
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

  onTouchMove(event): void {
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
        -(this.state.options.length * this.props.itemHeight),
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

    const index = this.getIndexByOffset(this.state.offset);
    this.setState({
      duration: DEFAULT_DURATION,
    });
    this.setIndex(index, true);

    // compatible with desktop scenario
    // use setTimeout to skip the click event triggered after touchstart
    setTimeout(() => {
      this.setState({
        moving: false,
      });
    }, 0);
  }

  // 滑动惯性
  momentum(distance, duration): void {
    const speed = Math.abs(distance / duration);

    distance = this.state.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);

    const index = this.getIndexByOffset(distance);

    this.setState({
      duration: +this.props.swipeDuration,
    });
    this.setIndex(index, true);
  }

  // 校正index，使其跳过不可选
  adjustIndex(index): number {
    const length = this.state.options.length;
    index = range(index, 0, length);

    for (let i = index; i < length; i++) {
      if (!isOptionDisabled(this.state.options[i])) return i;
    }

    for (let i = index - 1; i >= 0; i--) {
      if (!isOptionDisabled(this.state.options[i])) return i;
    }
  }

  genOptions(): preact.JSX.Element {
    const props = this.props;
    const { options, currentIndex } = this.state;
    const optionStyle = {
      height: `${props.itemHeight}px`,
    };

    return options.map((option, index: number) => {
      const text = this.getOptionText(option);
      const disabled = isOptionDisabled(option);

      const data = {
        style: optionStyle,
        attrs: {
          role: 'button',
          tabindex: disabled ? -1 : 0,
        },
        className: clsx(
          bem('item', {
            disabled,
            selected: index === currentIndex,
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
          <div {...childData}>{text}</div>
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
          ref={(el): void => {
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
