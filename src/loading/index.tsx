import * as preact from 'preact';
import clsx from 'clsx';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type LoadingType = 'circular' | 'spinner';

export type LoadingProps = {
  type?: LoadingType;
  color?: string;
  size?: number | string;
  vertical?: boolean;
  textSize?: number | string;
  className?: string;
};

const bem = createBEM('pant-loading');

const LoadingIcon: preact.FunctionalComponent<LoadingProps> = props => {
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
};

const LoadingText: preact.FunctionalComponent<LoadingProps> = props => {
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
};

export const Loading: preact.FunctionalComponent<LoadingProps> = props => {
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
};

Loading.defaultProps = {
  type: 'circular',
};
