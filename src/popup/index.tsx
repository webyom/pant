import * as preact from 'preact';
import clsx from 'clsx';
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
  lazyRender?: boolean;
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
  zIndex?: number | string;
  className?: string;
  children?: preact.ComponentChild;
  onClickClose?(event: Event, props: PopupProps): void;
} & TransitionEvents;

type PopupState = {
  active: boolean;
};

const bem = createBEM('pant-popup');

export class Popup extends preact.Component<PopupProps, PopupState> {
  bindedOnClickClose = this.onClickClose.bind(this);
  bindedOnAfterLeave = this.onAfterLeave.bind(this);
  state = {
    active: !!this.props.show,
  };

  static getDerivedStateFromProps(props: PopupProps): PopupState {
    if (props.show) {
      return { active: true };
    }
    return null;
  }

  private onClickClose(event: Event): void {
    const props = this.props;
    props.onClickClose && props.onClickClose(event, props);
  }

  private onAfterLeave(): void {
    this.setState({ active: false });
    this.props.onAfterLeave && this.props.onAfterLeave();
  }

  render(): preact.JSX.Element {
    const props = this.props;

    if (props.lazyRender && !this.state.active) {
      return;
    }

    const { show, zIndex, round, position, duration } = props;
    const isCenter = position === 'center';

    const transitionName = isCenter ? 'fade' : `popup-slide-${position}`;

    const style: Record<string, number | string> = {
      ...props.customStyle,
      zIndex: zIndex,
    };
    if (isDef(duration)) {
      style['animationDuration'] = `${duration}s`;
    }

    return (
      <preact.Fragment>
        {props.overlay ? (
          <Overlay show={show} zIndex={zIndex} onClick={props.closeOnClickOverlay ? this.bindedOnClickClose : null} />
        ) : null}
        <Transition
          customName={transitionName}
          stage={show ? 'enter' : 'leave'}
          onAfterEnter={props.onAfterEnter}
          onAfterLeave={this.bindedOnAfterLeave}
        >
          <div
            style={style}
            className={clsx(
              bem({
                round,
                [position]: position,
                'safe-area-inset-bottom': props.safeAreaInsetBottom,
              }),
              props.className,
            )}
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
  lazyRender: true,
  closeIcon: 'cross',
  closeIconPosition: 'top-right',
  position: 'center',
  overlay: true,
  closeOnClickOverlay: true,
};
