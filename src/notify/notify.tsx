import * as preact from 'preact';
import { Popup, PopupProps } from '../popup';
import { getIncrementalZIndex } from '../utils';
import { createBEM } from '../utils/bem';
import { Z_INDEX_NOTIFY_BASE } from '../utils/constant';
import './index.scss';

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning';

export type NotifyProps = PopupProps & {
  message: string;
  type?: NotifyType;
  color?: string;
  background?: string;
  style?: Record<string, string | number>;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-notify');

export const Notify: preact.FunctionalComponent<NotifyProps> = props => {
  const style = {
    ...props.style,
    color: props.color,
    background: props.background,
  };

  return (
    <Popup
      show={props.show}
      style={{ backgroundColor: 'transparent' }}
      zIndex={props.zIndex || getIncrementalZIndex(Z_INDEX_NOTIFY_BASE)}
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
};

Notify.defaultProps = {
  type: 'danger',
  position: 'top',
};
