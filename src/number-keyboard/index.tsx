import * as preact from 'preact';
import clsx from 'clsx';
import { createBEM } from '../utils/bem';
import { Transition } from '../transition';
import { Key } from './key';
import './index.scss';

const bem = createBEM('pant-number-keyboard');

type NumberKeyboardProps = {
  title?: string;
  theme?: 'default' | 'custom';
  show?: boolean;
  zIndex?: number;
  extraKey?: string | string[];
  closeButtonText?: string;
  deleteButtonText?: string;
  showDeleteKey?: boolean;
  hideOnClickOutside?: boolean;
  safeAreaInsetBottom?: boolean;
  onClose?: () => void;
  onBlur?: () => void;
  onInput?: (key: string) => void;
  onDelete?: () => void;
  onShow?: () => void;
  onHide?: () => void;
};

type NumberKeyboardState = {
  prevShow: boolean;
  prevTitle: string;
  transition: boolean;
};

export class NumberKeyboard extends preact.Component<NumberKeyboardProps, NumberKeyboardState> {
  constructor(props: NumberKeyboardProps) {
    super(props);
    this.state = {
      prevShow: false,
      prevTitle: '',
      transition: true,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount(): void {
    if (this.props.hideOnClickOutside) {
      document.body.addEventListener('touchstart', this.onBlur);
    }
  }

  onTouchStart(event: TouchEvent): void {
    event.stopPropagation();
  }

  static getDerivedStateFromProps(nextProps: NumberKeyboardProps, state: NumberKeyboardState): NumberKeyboardState {
    const { title, show } = nextProps;
    const { prevTitle, prevShow } = state;
    if (title !== prevTitle || show !== prevShow) {
      return {
        prevTitle: title,
        prevShow: show,
        transition: true,
      };
    } else {
      return null;
    }
  }

  onBlur(): void {
    this.props.show && this.props.onBlur();
  }

  onClose(): void {
    this.props.onClose && this.props.onClose();
    this.onBlur();
  }

  onPress(text: string, type: string): void {
    if (text === '') {
      if (type === 'extra') {
        this.onBlur();
      }
      return;
    }
    if (type === 'delete') {
      this.props.onDelete && this.props.onDelete();
    } else if (type === 'close') {
      this.onClose();
    } else {
      this.props.onInput && this.props.onInput(text);
    }
  }

  genBasicKeys(): any[] {
    const keys = [];
    for (let i = 1; i <= 9; i++) {
      keys.push({ text: i });
    }
    return keys;
  }

  genDefaultKeys(): any[] {
    return [
      ...this.genBasicKeys(),
      { text: this.props.extraKey, type: 'extra' },
      { text: 0 },
      {
        text: this.props.showDeleteKey ? this.props.deleteButtonText : '',
        type: this.props.showDeleteKey ? 'delete' : '',
      },
    ];
  }

  genCustomKeys(): any[] {
    const keys = this.genBasicKeys();
    const { extraKey } = this.props;
    const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
    if (extraKeys.length === 1) {
      keys.push({ text: 0, wider: true }, { text: extraKey[0], type: 'extra' });
    } else if (extraKeys.length === 2) {
      keys.push({ text: extraKey[0], type: 'extra' }, { text: 0 }, { text: extraKey[1], type: 'extra' });
    }

    return keys;
  }

  onAnimationEnd(): void {
    if (this.props.show) {
      this.props.onShow && this.props.onShow();
    } else {
      this.props.onHide && this.props.onHide();
    }
  }

  genTitle(): preact.JSX.Element {
    const { title, theme, closeButtonText } = this.props;
    let customTitle;
    if (title && typeof title !== 'string') {
      customTitle = title;
    }
    const showClose = closeButtonText && theme === 'default';
    const showTitle = title || showClose || customTitle;

    if (!showTitle) {
      return;
    }

    return (
      <div className={bem('header')}>
        {customTitle ? customTitle : title ? <h2 className={bem('title')}>{title}</h2> : null}
        {showClose && (
          <button type="button" className={bem('close')} onClick={this.onClose}>
            {closeButtonText}
          </button>
        )}
      </div>
    );
  }

  genKeys(): preact.JSX.Element[] {
    let keys: any[] = [];
    if (this.props.theme === 'custom') {
      keys = this.genCustomKeys();
    } else {
      keys = this.genDefaultKeys();
    }
    return keys.map(key => (
      <Key text={key.text} type={key.type} wider={key.wider} onPress={this.onPress.bind(this)}></Key>
    ));
  }

  genSidebar(): preact.JSX.Element {
    const { theme, showDeleteKey, deleteButtonText, closeButtonText } = this.props;
    if (theme === 'custom') {
      return (
        <div className={bem('sidebar')}>
          {showDeleteKey && <Key large text={deleteButtonText} type="delete" onPress={this.onPress.bind(this)}></Key>}
          <Key large text={closeButtonText} type="close" color="blue" onPress={this.onPress.bind(this)} />
        </div>
      );
    }
  }

  render(): preact.JSX.Element {
    const { safeAreaInsetBottom, zIndex } = this.props;
    const { prevShow, transition } = this.state;
    const Title = this.genTitle();
    return (
      <Transition customName={transition ? 'slide-up' : ''} stage={prevShow ? 'enter' : 'leave'}>
        <div
          style={{ zIndex: zIndex }}
          className={clsx(
            bem({
              unfit: !safeAreaInsetBottom,
              'with-title': Title,
              show: prevShow,
            }),
          )}
          onTouchStart={this.onTouchStart}
          onAnimationEnd={this.onAnimationEnd}
        >
          {Title}
          <div className={bem('body')}>
            <div className={bem('keys')}>{this.genKeys()}</div>
            {this.genSidebar()}
          </div>
        </div>
      </Transition>
    );
  }
}

NumberKeyboard.defaultProps = {
  title: '键盘标题',
  theme: 'default',
  show: false,
  zIndex: 100,
  extraKey: '',
  closeButtonText: '完成',
  showDeleteKey: true,
  hideOnClickOutside: true,
  safeAreaInsetBottom: true,
};
