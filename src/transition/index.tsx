import * as preact from 'preact';
import './index.scss';

export type TransitionProps = {
  type: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  stage: 'enter' | 'leave';
  children: preact.VNode;
  onAfterEnter?(): void;
  onAfterLeave?(): void;
};

type TransitionState = {
  prevProps: TransitionProps;
  active: boolean;
};

export class Transition extends preact.Component<TransitionProps, TransitionState> {
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
    this.setState({ active: false }, (): void => {
      const { stage, onAfterEnter, onAfterLeave } = this.props;
      if (stage === 'enter') {
        onAfterEnter && onAfterEnter();
      } else {
        onAfterLeave && onAfterLeave();
      }
    });
  }

  render(): preact.JSX.Element {
    const { type, stage, children } = this.props;
    const active = this.state.active;
    const transitionClassName = active ? `pant-${type}-${stage}-active` : '';
    const childrenClassName = children.props.className;
    const className = transitionClassName
      ? childrenClassName
        ? childrenClassName + ' ' + transitionClassName
        : transitionClassName
      : childrenClassName;
    const childrenStyle = children.props.style;

    let style;
    if (stage === 'leave' && !active) {
      if (typeof childrenStyle === 'string') {
        style = 'display: none; ' + childrenStyle;
      } else {
        style = { ...childrenStyle, display: 'none' };
      }
    } else {
      style = childrenStyle;
    }

    return (
      <preact.Fragment>
        {preact.cloneElement(children, { className, style, onAnimationEnd: this.onAnimationEnd.bind(this) })}
      </preact.Fragment>
    );
  }
}
