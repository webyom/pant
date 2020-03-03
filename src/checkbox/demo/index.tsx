import * as preact from 'preact';
import { Checkbox, CheckboxProps } from '../../checkbox';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-checkbox');

type CheckboxRouteComponentState = {
  checked1: boolean;
  checked2: boolean;
  checked3: boolean;
  checked4: boolean;
  checked5: boolean;
  checked6: boolean;
  checked7: boolean;
};

export class CheckboxRouteComponent extends preact.Component<any, CheckboxRouteComponentState> {
  state = {
    checked1: true,
    checked2: false,
    checked3: true,
    checked4: true,
    checked5: true,
    checked6: true,
    checked7: true,
  };

  onClick(_: Event, props: CheckboxProps): void {
    this.setState({ [props.name]: !props.checked });
  }

  render(): preact.JSX.Element {
    const state = this.state;

    return (
      <preact.Fragment>
        <NavBar title="Checkbox" type="checkbox" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Checkbox name="checked1" checked={state.checked1} onClick={this.onClick.bind(this)}>
              Checkbox
            </Checkbox>
          </section>

          <section>
            <h2>Disabled</h2>
            <Checkbox name="checked2" checked={state.checked2} disabled onClick={this.onClick.bind(this)}>
              Checkbox
            </Checkbox>
            <Checkbox name="checked3" checked={state.checked3} disabled onClick={this.onClick.bind(this)}>
              Checkbox
            </Checkbox>
          </section>

          <section>
            <h2>Custom Shape</h2>
            <Checkbox name="checked4" checked={state.checked4} shape="square" onClick={this.onClick.bind(this)}>
              Checkbox
            </Checkbox>
          </section>

          <section>
            <h2>Custom Color</h2>
            <Checkbox name="checked5" checked={state.checked5} checkedColor="#07c160" onClick={this.onClick.bind(this)}>
              Checkbox
            </Checkbox>
          </section>

          <section>
            <h2>Custom Icon Size</h2>
            <Checkbox name="checked6" checked={state.checked6} iconSize="24px" onClick={this.onClick.bind(this)}>
              Checkbox
            </Checkbox>
          </section>

          <section>
            <h2>Custom Icon</h2>
            <Checkbox
              name="checked7"
              checked={state.checked7}
              iconNode={
                <img
                  src={
                    state.checked7
                      ? 'https://img.yzcdn.cn/vant/user-active.png'
                      : 'https://img.yzcdn.cn/vant/user-inactive.png'
                  }
                />
              }
              onClick={this.onClick.bind(this)}
            >
              Checkbox
            </Checkbox>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
