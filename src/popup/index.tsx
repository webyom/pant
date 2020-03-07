import * as preact from 'preact';
import { Icon } from '../icon';
import { Overlay } from '../overlay';
import { Transition, TransitionEvents } from '../transition';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import { preventDefaultAndStopPropagation } from '../utils/event';
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
  onClickClose?(event: Event, props: PopupProps): void;
} & TransitionEvents;

const bem = createBEM('pant-popup');

export class Popup extends preact.Component<PopupProps> {
  bindedOnClickClose = this.onClickClose.bind(this);

  onClickClose(event: Event): void {
    const props = this.props;
    props.onClickClose && props.onClickClose(event, props);
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
        {props.overlay ? (
          <Overlay show={show} onClick={props.closeOnClickOverlay ? this.bindedOnClickClose : null} />
        ) : null}
        <Transition
          customName={transitionName}
          stage={show ? 'enter' : 'leave'}
          onAfterEnter={props.onAfterEnter}
          onAfterLeave={props.onAfterLeave}
        >
          <div
            style={style}
            className={bem({
              round,
              [position]: position,
              'safe-area-inset-bottom': props.safeAreaInsetBottom,
            })}
            onTouchMove={preventDefaultAndStopPropagation}
          >
            {props.children}
            {props.closeable && (
              <Icon
                name={props.closeIcon}
                className={bem('close-icon', props.closeIconPosition)}
                onClick={this.bindedOnClickClose}
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
