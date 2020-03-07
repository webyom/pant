import * as preact from 'preact';
import { Icon } from '../icon';
import { Overlay } from '../overlay';
import { Transition } from '../transition';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type PopupPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export type PopupCloseIconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type PopupProps = {
  name?: string;
  show?: boolean;
  round?: boolean;
  duration?: number | string;
  closeable?: boolean;
  closeIcon?: string;
  closeIconPosition?: PopupCloseIconPosition;
  safeAreaInsetBottom?: boolean;
  position?: PopupPosition;
  overlay?: boolean;
  closeOnClickOverlay?: boolean;
  customStyle?: Record<string, string>;
  children?: string | preact.VNode | preact.VNode[];
  onClose?(event: Event, props: PopupProps): void;
};

const bem = createBEM('pant-popup');

export class Popup extends preact.Component<PopupProps> {
  onClose(event: Event): void {
    const props = this.props;
    props.onClose && props.onClose(event, props);
  }

  render(): preact.JSX.Element {
    const props = this.props;
    const { show, round, position, duration } = props;
    const isCenter = position === 'center';

    const transitionName = isCenter ? 'fade' : `popup-slide-${position}`;

    const style: Record<string, string> = {
      ...props.customStyle,
    };
    if (isDef(duration)) {
      style['animationDuration'] = `${duration}s`;
    }

    return (
      <preact.Fragment>
        {props.overlay ? <Overlay show={show} /> : null}
        <Transition name={transitionName} stage={show ? 'enter' : 'leave'}>
          <div
            style={style}
            className={bem({
              round,
              [position]: position,
              'safe-area-inset-bottom': props.safeAreaInsetBottom,
            })}
          >
            {props.children}
            {props.closeable && (
              <Icon
                name={props.closeIcon}
                className={bem('close-icon', props.closeIconPosition)}
                onClick={this.onClose.bind(this)}
              />
            )}
          </div>
        </Transition>
      </preact.Fragment>
    );
  }
}

Popup.defaultProps = {
  closeIcon: 'cross',
  closeIconPosition: 'top-right',
  position: 'center',
  overlay: true,
  closeOnClickOverlay: true,
};
