import * as preact from 'preact';
import { Icon } from '../icon';
import { isDef, addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type ImgProps = {
  src: string;
  fit?: string;
  alt?: string;
  round?: boolean;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  lazyLoad?: boolean;
  showError?: boolean;
  showLoading?: boolean;
  errorNode?: string | preact.VNode;
  loadingNode?: string | preact.VNode;
  errorIcon?: string;
  loadingIcon?: string;
  onClick?(event: Event): void;
};

type ImgState = {
  error: boolean;
  loading: boolean;
};

const bem = createBEM('pant-img');

export class Img extends preact.Component<ImgProps, ImgState> {
  constructor(props: ImgProps) {
    super(props);
    this.state = {
      error: false,
      loading: true,
    };
  }

  genImage(): preact.JSX.Element {
    const props = this.props;
    const imgData = {
      className: bem('img'),
      alt: props.alt,
      style: {
        objectFit: props.fit,
      },
    };

    if (this.state.error) {
      return;
    }

    if (props.lazyLoad) {
      // TODO
    }

    return (
      <img
        src={props.src}
        onLoad={(): void => this.setState({ loading: false })}
        onError={(): void => this.setState({ loading: false, error: true })}
        {...imgData}
      />
    );
  }

  genPlaceholder(): preact.JSX.Element {
    const props = this.props;

    if (this.state.loading && props.showLoading) {
      return (
        <div class={bem('loading')}>
          {props.loadingNode || <Icon name={props.loadingIcon} className={bem('loading-icon')} />}
        </div>
      );
    }

    if (this.state.error && props.showError) {
      return (
        <div class={bem('error')}>
          {props.errorNode || <Icon name={props.errorIcon} className={bem('error-icon')} />}
        </div>
      );
    }
  }

  genStyle(): Record<string, string> {
    const props = this.props;
    const style: Record<string, string> = {};

    if (isDef(props.width)) {
      style.width = addUnit(props.width);
    }

    if (isDef(props.height)) {
      style.height = addUnit(props.height);
    }

    if (isDef(props.radius)) {
      style.overflow = 'hidden';
      style.borderRadius = addUnit(props.radius);
    }

    return style;
  }

  render(): preact.JSX.Element {
    return (
      <div class={bem({ round: this.props.round })} style={this.genStyle()} onClick={this.props.onClick}>
        {this.genImage()}
        {this.genPlaceholder()}
      </div>
    );
  }
}

Img.defaultProps = {
  round: false,
  showError: true,
  showLoading: true,
  errorIcon: 'warning-o',
  loadingIcon: 'photo-o',
};
