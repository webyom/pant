import * as preact from 'preact';
import clsx from 'clsx';
import { createBEM } from '../utils/bem';
import { preventDefault } from '../utils/event';
import './index.scss';

export type OverlayProps = {
  show?: boolean;
  zIndex?: number | string;
  duration?: number;
  className?: any;
  customStyle?: object;
  children?: preact.VNode | preact.VNode[];
  onClick?(event: Event): void;
};

const bem = createBEM('pant-overlay');

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
