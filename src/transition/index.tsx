import * as preact from 'preact';
import './index.scss';

export type TransitionableProps = {
  className?: string;
  style?: Record<string, string>;
};

export interface TransitionableComponent {
  addEventListener(
    type: string,
    listener: (this: HTMLElement, ev: Event) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: (this: HTMLElement, ev: Event) => any,
    options?: boolean | EventListenerOptions,
  ): void;
}

export type TransitionEvents = {
  onAfterEnter?(): void;
  onAfterLeave?(): void;
};

export type TransitionName = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

export type TransitionStage = 'enter' | 'leave';

export type TransitionProps = {
  stage: TransitionStage;
  name?: TransitionName;
  customName?: string;
  duration?: number | string;
  children: preact.VNode<TransitionableProps>;
} & TransitionEvents;

type TransitionState = {
  prevProps: TransitionProps;
  active: boolean;
};

const animationEndEventName =
  window.onanimationend === undefined && (window as any).onwebkitanimationend !== undefined
    ? 'webkitAnimationEnd'
    : 'animationend';

export class Transition extends preact.Component<TransitionProps, TransitionState> {
  childrenRef: TransitionableComponent;
  bindedOnAnimationEnd = this.onAnimationEnd.bind(this);
  state = {
    prevProps: this.props,
    active: this.props.stage === 'enter',
  };

  static getDerivedStateFromProps(props: TransitionProps, state: TransitionState): TransitionState {
    if (props.stage !== state.prevProps.stage) {
      return {
        prevProps: props,
        active: true,
      };
    }
    return null;
  }

  private onAnimationEnd(): void {
    (this.childrenRef as any).removeEventListener(animationEndEventName, this.bindedOnAnimationEnd);
    this.setState({ active: false }, (): void => {
      const { stage, onAfterEnter, onAfterLeave } = this.props;
      if (stage === 'enter') {
        onAfterEnter && onAfterEnter();
      } else {
        onAfterLeave && onAfterLeave();
      }
    });
  }

  componentDidMount(): void {
    this.childrenRef.addEventListener(animationEndEventName, this.bindedOnAnimationEnd);
  }

  componentDidUpdate(): void {
    this.childrenRef.addEventListener(animationEndEventName, this.bindedOnAnimationEnd);
  }

  render(): preact.JSX.Element {
    const { name, customName, stage, duration, children } = this.props;
    const active = this.state.active;
    const transitionClassName = active ? `pant-${customName || name}-${stage}-active` : '';
    const childrenClassName = children.props.className;
    const className = transitionClassName
      ? childrenClassName
        ? childrenClassName + ' ' + transitionClassName
        : transitionClassName
      : childrenClassName;
    const childrenStyle = children.props.style;

    let style;
    if (stage === 'leave' && !active) {
      style = { ...childrenStyle, display: 'none' };
    } else {
      style = childrenStyle;
    }
    if (active) {
      style = { ...style, animationDuration: `${duration}s`, WebkitAnimationDuration: `${duration}s` };
    }

    return (
      <preact.Fragment>
        {preact.cloneElement(children, {
          className,
          style,
          ref: (el: TransitionableComponent) => {
            this.childrenRef = el;
          },
        })}
      </preact.Fragment>
    );
  }
}

Transition.defaultProps = {
  name: 'fade',
  duration: '0.3',
};
