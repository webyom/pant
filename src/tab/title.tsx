import * as preact from 'preact';
import clsx from 'clsx';
import { Info } from '../info';
import { createBEM } from '../utils/bem';
import './index.scss';

export type TitleParentProps = {
  type?: 'line' | 'card';
  color?: string;
  ellipsis?: boolean;
  scrollable?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  swipeThreshold?: number | string;
};

export type TitleProps = TitleParentProps & {
  dot?: boolean;
  info?: number | string;
  title: string;
  titleNode?: preact.VNode;
  name?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?(event: Event, props: TitleProps): void;
};

const bem = createBEM('pant-tab');

export const Title: preact.FunctionalComponent<TitleProps> = props => {
  const {
    dot,
    type,
    info,
    color,
    title,
    titleNode,
    scrollable,
    disabled,
    isActive,
    ellipsis,
    activeColor,
    inactiveColor,
    swipeThreshold,
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

  const onClick = (evt: Event): void => {
    props.onClick(evt, props);
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
        {titleNode || title}
        <Info dot={dot} info={info} />
      </span>
    </div>
  );
};

Title.defaultProps = {
  type: 'line',
};
