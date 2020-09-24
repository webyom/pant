import * as preact from 'preact';
import { createBEM } from '../utils/bem';
import { DeleteIcon } from './delete-icon';
import { CollapseIcon } from './collapse-icon';
import { TouchHandler } from '../utils/touch-handler';
import './index.scss';

const bem = createBEM('pant-key');

type KeyProps = {
  text: string;
  type: string;
  wider?: boolean;
  color?: string;
  large?: boolean;
  onPress?: (text: string, type: string) => void;
};

type KeyState = {
  active: boolean;
};

export class Key extends preact.Component<KeyProps, KeyState> {
  private elRef = preact.createRef<HTMLDivElement>();
  private touchHandler: TouchHandler;

  constructor(props: KeyProps) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentDidMount(): void {
    this.touchHandler = new TouchHandler(this.elRef.current, {
      onTouchStart: this.onTouchStart.bind(this),
      onTouchMove: this.onTouchMove.bind(this),
      onTouchEnd: this.onTouchEnd.bind(this),
    });
  }

  componentWillUnmount(): void {
    this.touchHandler.destroy();
    this.touchHandler = null;
  }

  onTouchStart(event: TouchEvent): void {
    // compatible with Vue 2.6 event bubble bug
    event.stopPropagation();
    this.setState({
      active: true,
    });
  }

  onTouchMove(): void {
    if (this.touchHandler.state.direction) {
      this.setState({
        active: false,
      });
    }
  }

  onTouchEnd(): void {
    const { text, type } = this.props;
    if (this.state.active) {
      // eliminate tap delay on safari
      event.preventDefault();
      this.setState({
        active: false,
      });
      this.props.onPress && this.props.onPress(text, type);
    }
  }

  genContent(): string | preact.JSX.Element {
    const { type, text } = this.props;
    const isExtra = type === 'extra';
    const isDelete = type === 'delete';

    if (isDelete) {
      return text || <DeleteIcon className={bem('delete-icon')} />;
    }

    if (isExtra) {
      return text || <CollapseIcon className={bem('collapse-icon')} />;
    }

    return text;
  }

  render(): preact.JSX.Element {
    const { wider, color, large, type } = this.props;
    const { active } = this.state;
    return (
      <div ref={this.elRef} className={bem('wrapper', { wider: wider })}>
        <div
          role="button"
          className={bem([
            color,
            {
              large: large,
              active: active,
              delete: type === 'delete',
            },
          ])}
        >
          {this.genContent()}
        </div>
      </div>
    );
  }
}
