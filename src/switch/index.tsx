import * as preact from 'preact';
import { Loading } from '../loading';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import { BLUE } from '../utils/constant';
import './index.scss';

export type SwitchProps = {
  name?: string;
  on?: boolean;
  size?: string | number;
  value?: any;
  loading?: boolean;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  customStyle?: Record<string, string | number>;
  onClick?(event: Event, props: SwitchProps): void;
};

const bem = createBEM('pant-switch');

export const Switch: preact.FunctionalComponent<SwitchProps> = props => {
  const { on, loading, disabled } = props;

  const style = {
    ...props.customStyle,
    fontSize: addUnit(props.size),
    backgroundColor: on ? props.activeColor : props.inactiveColor,
  };

  function onClick(event: Event): void {
    if (loading || disabled) {
      return;
    }
    props.onClick && props.onClick(event, props);
  }

  function genLoading(): preact.JSX.Element {
    if (props.loading) {
      const color = on ? props.activeColor || BLUE : props.inactiveColor || '';

      return <Loading className={bem('loading')} color={color} />;
    }
  }

  return (
    <div
      class={bem({
        on: on,
        loading,
        disabled,
      })}
      role="switch"
      style={style}
      aria-checked={String(!!on)}
      onClick={onClick}
    >
      <div class={bem('node')}>{genLoading()}</div>
    </div>
  );
};
