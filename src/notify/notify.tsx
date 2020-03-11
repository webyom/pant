import * as preact from 'preact';
import { Popup, PopupProps } from '../popup';
import { createBEM } from '../utils/bem';
import './index.scss';

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning';

export type NotifyProps = PopupProps & {
  message: string;
  type?: NotifyType;
  color?: string;
  background?: string;
  customStyle?: Record<string, string | number>;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-notify');

export function Notify(props: NotifyProps): preact.JSX.Element {
  const style = {
    ...props.customStyle,
    color: props.color,
    background: props.background,
  };

  return (
    <Popup
      show={props.show}
      customStyle={{ backgroundColor: 'transparent' }}
      zIndex={props.zIndex}
      overlay={false}
      duration={0.2}
      lockScroll={false}
      position={props.position}
      fadeLeave={props.fadeLeave}
      onClick={props.onClick}
      onOpened={props.onOpened}
      onClosed={props.onClosed}
    >
      <div className={bem([props.type])} style={style}>
        {props.message}
      </div>
    </Popup>
  );
}

Notify.defaultProps = {
  type: 'danger',
  position: 'top',
};
