import * as preact from 'preact';
import clsx from 'clsx';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import { BORDER_SURROUND, BORDER_LEFT } from '../utils/constant';
import './index.scss';

const bem = createBEM('pant-password-input');

type PasswordInputProps = {
  gutter?: number | string;
  value?: string;
  focused?: boolean;
  mask?: boolean;
  length?: number;
  pointClassName?: string;
  onFocuse?: () => void;
};

type PasswordInputState = {
  prevValue: string;
  prevFocused: boolean;
  points: preact.JSX.Element[];
};

const getPoints = (
  value: string,
  length: number,
  gutter: number | string,
  focused: boolean,
  mask: boolean,
  pointClassName?: string,
): preact.JSX.Element[] => {
  const newPoints: preact.JSX.Element[] = [];
  for (let i = 0; i < length; i++) {
    const char = value[i];
    const showBorder = i !== 0 && !gutter;
    const showCursor = focused && i === value.length;

    let style;
    if (i !== 0 && gutter) {
      style = { marginLeft: addUnit(gutter) };
    }

    newPoints.push(
      <li
        className={clsx(bem('item', { focus: showCursor }), { [BORDER_LEFT]: showBorder }, pointClassName)}
        style={style}
      >
        {mask ? <i style={{ visibility: char ? 'visible' : 'hidden' }} /> : char}
        {showCursor && <div className={bem('cursor')} />}
      </li>,
    );
  }
  return newPoints;
};

export class PasswordInput extends preact.Component<PasswordInputProps, PasswordInputState> {
  constructor(props: PasswordInputProps) {
    super(props);
    this.state = {
      prevValue: '',
      prevFocused: true,
      points: getPoints(props.value, props.length, props.gutter, props.focused, props.mask),
    };
    this.onTouchStart = this.onTouchStart.bind(this);
  }

  static getDerivedStateFromProps(nextProps: PasswordInputProps, state: PasswordInputState): PasswordInputState {
    const { value, length, gutter, focused, mask, pointClassName } = nextProps;
    const { prevValue, prevFocused } = state;
    if (value !== prevValue || focused !== prevFocused) {
      const newPoints = getPoints(value, length, gutter, focused, mask, pointClassName);
      return {
        prevValue: value,
        prevFocused: focused,
        points: newPoints,
      };
    } else {
      return null;
    }
  }

  onTouchStart(event: TouchEvent): void {
    event.stopPropagation();
    this.props.onFocuse && this.props.onFocuse();
  }

  render(): preact.JSX.Element {
    const { gutter } = this.props;
    return (
      <div className={bem()}>
        <ul onTouchStart={this.onTouchStart} className={clsx(bem('security'), { [BORDER_SURROUND]: !gutter })}>
          {this.state.points}
        </ul>
      </div>
    );
  }
}

PasswordInput.defaultProps = {
  gutter: 0,
  value: '',
  focused: true,
  mask: true,
  length: 6,
};
