import * as preact from 'preact';
import { PasswordInput } from '../index';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import { NumberKeyboard } from '../../number-keyboard';
import './index.scss';

const bem = createBEM('demo-picker');

type PasswordInputState = {
  show: boolean;
  value1: string;
  value2: string;
  value3: string;
  keyboard: string;
};

export class PasswordInputRouteComponent extends preact.Component<any, PasswordInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      value1: '',
      value2: '',
      value3: '',
      keyboard: '',
    };
    this.onBlur = this.onBlur.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onFocuse = this.onFocuse.bind(this);
  }

  onFocuse(value: string): void {
    this.setState({
      keyboard: value,
      show: true,
    });
  }

  onClose(): void {
    this.setState({
      keyboard: '',
      show: false,
    });
  }

  onBlur(): void {
    this.setState({
      keyboard: '',
      show: false,
    });
  }

  onDelete(): void {
    const { keyboard } = this.state;
    const value = this.state[keyboard as 'value1' | 'value2'];
    this.setState({
      [keyboard]: value.substring(0, value.length - 1),
    });
  }

  onInput(text: string): void {
    const { keyboard } = this.state;
    const value = this.state[keyboard as 'value1' | 'value2'];
    this.setState({
      [keyboard]: `${value}${text}`,
    });
  }

  render(): preact.JSX.Element {
    const { show, value1, value2, value3, keyboard } = this.state;
    return (
      <preact.Fragment>
        <NavBar title="PasswordInput" type="PasswordInput" />
        <div className={bem()}>
          <section>
            <h2>基础用法</h2>
            <PasswordInput
              value={value1}
              focused={keyboard === 'value1'}
              onFocuse={(): void => this.onFocuse('value1')}
            />
          </section>
          <section>
            <h2>自定义长度</h2>
            <PasswordInput
              value={value2}
              focused={keyboard === 'value2'}
              onFocuse={(): void => this.onFocuse('value2')}
              length={4}
              gutter={30}
            />
          </section>
          <section>
            <h2>明文展示</h2>
            <PasswordInput
              value={value3}
              focused={keyboard === 'value3'}
              onFocuse={(): void => this.onFocuse('value3')}
              mask={false}
            />
          </section>
        </div>
        <NumberKeyboard
          show={show}
          onClose={this.onClose}
          onBlur={this.onBlur}
          onDelete={this.onDelete}
          onInput={this.onInput}
        />
      </preact.Fragment>
    );
  }
}
