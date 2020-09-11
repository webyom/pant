import * as preact from 'preact';
import { NumberKeyboard } from '../index';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import { Cell } from '../../cell';
import { CellGroup } from '../../cell-group';
import { toast } from '../../toast';
import './index.scss';

const bem = createBEM('demo-number-keyboard');

type NumberKeyboardState = {
  keyboard: string;
};

export class NumberKeyboardRouteComponent extends preact.Component<any, NumberKeyboardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      keyboard: '',
    };
    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onBlur(): void {
    this.setState({
      keyboard: '',
    });
  }

  onInput(text: string): void {
    toast(`输入：${text}`);
  }

  onDelete(): void {
    toast('删除');
  }

  onTouchStart(event: TouchEvent): void {
    event.stopPropagation();
  }

  render(): preact.JSX.Element {
    const { keyboard } = this.state;
    return (
      <preact.Fragment>
        <NavBar title="NumberKeyboard" type="number-keyboard" />
        <div className={bem()}>
          <div onTouchStart={this.onTouchStart}>
            <CellGroup border>
              <Cell
                title="弹出默认键盘"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ keyboard: 'show1' });
                }}
              ></Cell>
              <Cell
                title="弹出带右侧栏的键盘"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ keyboard: 'show2' });
                }}
              ></Cell>
              <Cell
                title="弹出身份证号键盘"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ keyboard: 'show3' });
                }}
              ></Cell>
              <Cell
                title="弹出带标题的键盘"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ keyboard: 'show4' });
                }}
              ></Cell>
              <Cell
                title="弹出配置多个按键的键盘"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ keyboard: 'show5' });
                }}
              ></Cell>
            </CellGroup>
          </div>

          <NumberKeyboard
            show={keyboard === 'show1'}
            onBlur={this.onBlur}
            onInput={this.onInput}
            onDelete={this.onDelete}
          />
          <NumberKeyboard
            show={keyboard === 'show2'}
            theme="custom"
            onBlur={this.onBlur}
            onInput={this.onInput}
            onDelete={this.onDelete}
          />
          <NumberKeyboard
            show={keyboard === 'show3'}
            extraKey="X"
            onBlur={this.onBlur}
            onInput={this.onInput}
            onDelete={this.onDelete}
          />
          <NumberKeyboard
            show={keyboard === 'show4'}
            title="我是标题"
            onBlur={this.onBlur}
            onInput={this.onInput}
            onDelete={this.onDelete}
          />
          <NumberKeyboard
            show={keyboard === 'show5'}
            extraKey={['00', '.']}
            onBlur={this.onBlur}
            onInput={this.onInput}
            onDelete={this.onDelete}
          />
        </div>
      </preact.Fragment>
    );
  }
}
