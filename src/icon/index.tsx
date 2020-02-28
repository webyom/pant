import * as preact from 'preact';
import clsx from 'clsx';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import { Info } from '../info';
import './index.scss';

const bem = createBEM('pant-img');

export type IconProps = {
  dot?: boolean;
  name?: string;
  size?: string | number;
  color?: string;
  info?: string | number;
  className?: string;
  classPrefix: string;
  onClick?(event: Event): void;
};

function isImage(name?: string): boolean {
  return name ? name.indexOf('/') !== -1 : false;
}

export function Icon(props: IconProps): preact.JSX.Element {
  const name = props.name;
  const imageIcon = isImage(name);

  return (
    <i
      className={clsx(props.classPrefix + (imageIcon ? '' : ` ${props.classPrefix}-${name}`), props.className)}
      style={{
        color: props.color,
        fontSize: addUnit(props.size),
      }}
      onClick={props.onClick}
    >
      {imageIcon && <img class={bem('image')} src={name} />}
      <Info dot={props.dot} info={props.info} />
    </i>
  );
}

Icon.defaultProps = {
  classPrefix: 'pant-icon',
};
