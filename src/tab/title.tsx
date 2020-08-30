import * as preact from 'preact';
import clsx from 'clsx';
import { Info } from '../info';
import { createBEM } from '../utils/bem';
import './index.scss';

export type TitleProps = {
  dot?: boolean;
  type?: 'line' | 'card';
  info?: number | string;
  color?: string;
  title?: string;
  isActive?: boolean;
  ellipsis?: boolean;
  disabled?: boolean;
  scrollable?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  swipeThreshold?: number | string;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-tab');

export const Title: preact.FunctionalComponent<TitleProps> = props => {
  const {
    dot,
    type,
    info,
    color,
    title,
    scrollable,
    disabled,
    isActive,
    ellipsis,
    activeColor,
    inactiveColor,
    swipeThreshold,
    onClick,
  } = props;

  const getStyle = (): Record<string, number | string> => {
    const style: Record<string, number | string> = {};
    const isCard = type === 'card';

    // card theme color
    if (color && isCard) {
      style.borderColor = color;

      if (!disabled) {
        if (isActive) {
          style.backgroundColor = color;
        } else {
          style.color = color;
        }
      }
    }

    const titleColor = isActive ? activeColor : inactiveColor;
    if (titleColor) {
      style.color = titleColor;
    }

    if (scrollable && ellipsis) {
      style.flexBasis = `${88 / +swipeThreshold}%`;
    }

    return style;
  };

  return (
    <div
      role="tab"
      aria-selected={isActive}
      className={clsx(
        bem({
          active: isActive,
          disabled: disabled,
        }),
        {
          'pant-ellipsis': ellipsis,
        },
      )}
      style={getStyle()}
      onClick={onClick}
    >
      <span class={bem('text')}>
        {title}
        <Info dot={dot} info={info} />
      </span>
    </div>
  );
};

Title.defaultProps = {
  type: 'line',
};
