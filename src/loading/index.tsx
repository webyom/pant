import * as preact from 'preact';
import clsx from 'clsx';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type LoadingType = 'circular' | 'spinner';

export type LoadingProps = {
  type: LoadingType;
  color?: string;
  size?: string | number;
  vertical?: boolean;
  textSize?: string | number;
  className?: string;
  children?: string;
};

const bem = createBEM('pant-loading');

function LoadingIcon(props: LoadingProps): preact.JSX.Element {
  if (props.type === 'spinner') {
    const Spin = [];
    for (let i = 0; i < 12; i++) {
      Spin.push(<i />);
    }
    return <preact.Fragment>{Spin}</preact.Fragment>;
  }

  return (
    <svg class={bem('circular')} viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" fill="none" />
    </svg>
  );
}

function LoadingText(props: LoadingProps): preact.JSX.Element {
  const { children } = props;
  if (children) {
    const style = props.textSize && {
      fontSize: addUnit(props.textSize),
    };

    return (
      <span class={bem('text')} style={style}>
        {children}
      </span>
    );
  }
}

export function Loading(props: LoadingProps): preact.JSX.Element {
  const { color, size, type } = props;

  const style: Record<string, string> = { color };
  if (size) {
    const iconSize = addUnit(size) as string;
    style.width = iconSize;
    style.height = iconSize;
  }

  return (
    <div className={clsx(bem([type, { vertical: props.vertical }]), props.className)}>
      <span className={bem('spinner', type)} style={style}>
        <LoadingIcon {...props} />
      </span>
      <LoadingText {...props} />
    </div>
  );
}

Loading.defaultProps = {
  type: 'circular',
};
