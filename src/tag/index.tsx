import * as preact from 'preact';
import clsx from 'clsx';
import { Icon } from '../icon';
import { createBEM } from '../utils/bem';
import { BORDER_SURROUND } from '../utils/constant';
import './index.scss';

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export type TagSize = 'large' | 'medium';

export type TagProps = {
  type: TagType;
  size?: TagSize;
  mark?: boolean;
  color?: string;
  plain?: boolean;
  round?: boolean;
  textColor?: string;
  closeable?: boolean;
  children?: string;
  onClose?(): void;
};

const bem = createBEM('pant-tag');

export function Tag(props: TagProps): preact.JSX.Element {
  const { type, mark, plain, color, round, size } = props;

  const key = plain ? 'color' : 'backgroundColor';
  const style = { [key]: color };

  if (props.textColor) {
    style.color = props.textColor;
  }

  const classes: { [key: string]: any } = { mark, plain, round };
  if (size) {
    classes[size] = size;
  }

  const CloseIcon = props.closeable && (
    <Icon
      name="cross"
      className={bem('close')}
      onClick={(event: Event): void => {
        event.stopPropagation();
        props.onClose && props.onClose();
      }}
    />
  );

  return (
    <span key="content" style={style} className={clsx(bem([classes, type]), { [BORDER_SURROUND]: plain })}>
      {props.children}
      {CloseIcon}
    </span>
  );
}

Tag.defaultProps = {
  type: 'default',
};
