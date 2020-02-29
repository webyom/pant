import * as preact from 'preact';
import clsx from 'clsx';
import { createBEM } from '../utils/bem';
import { preventDefault } from '../utils/event';
import './index.scss';

const bem = createBEM('pant-overlay');

export type OverlayProps = {
  show?: boolean;
  zIndex?: number | string;
  duration?: number;
  className?: any;
  customStyle?: object;
  children?: preact.JSX.Element;
  onClick?(event: Event): void;
};

function preventTouchMove(event: TouchEvent): void {
  preventDefault(event, true);
}

export function Overlay(props: OverlayProps): preact.JSX.Element {
  const style: Record<string, any> = {
    ...props.customStyle,
    zIndex: props.zIndex,
    display: props.show ? 'block' : 'none',
  };

  if (props.duration > 0) {
    style.animationDuration = `${props.duration}s`;
  }

  return (
    <div style={style} className={clsx(bem(), props.className)} onTouchMove={preventTouchMove} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
