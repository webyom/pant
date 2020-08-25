import * as preact from 'preact';
import clsx from 'clsx';
import { Transition, TransitionEvents } from '../transition';
import { createBEM } from '../utils/bem';
import { preventDefaultAndStopPropagation } from '../utils/event';
import { pantConfig } from '../';
import './index.scss';

export type OverlayProps = {
  show?: boolean;
  lockScroll?: boolean;
  zIndex?: number | string;
  duration?: number;
  className?: any;
  customStyle?: Record<string, string | number>;
  onClick?(event: Event): void;
} & TransitionEvents;

const bem = createBEM('pant-overlay');

export const Overlay: preact.FunctionalComponent<OverlayProps> = props => {
  const style: Record<string, any> = {
    backgroundColor: pantConfig('defaultOverlayBgColor'),
    ...props.customStyle,
    zIndex: props.zIndex,
  };

  if (props.duration > 0) {
    style.animationDuration = `${props.duration}s`;
  }

  return (
    <Transition
      name="fade"
      stage={props.show ? 'enter' : 'leave'}
      onAfterEnter={props.onAfterEnter}
      onAfterLeave={props.onAfterLeave}
    >
      <div
        style={style}
        className={clsx(bem(), props.className)}
        onTouchMove={props.lockScroll ? preventDefaultAndStopPropagation : null}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </Transition>
  );
};

Overlay.defaultProps = {
  lockScroll: true,
};
