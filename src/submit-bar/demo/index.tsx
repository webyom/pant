import * as preact from 'preact';
import { toast } from '../../toast';
import { Checkbox } from '../../checkbox';
import { SubmitBar } from '../../submit-bar';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-submit-bar');

export class SubmitBarRouteComponent extends preact.Component<{}, { checked: boolean }> {
  state = {
    checked: true,
  };

  onSubmit(): void {
    toast('On Submit');
  }

  onClickLink(): void {
    toast('On Click Link');
  }

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="SubmitBar" type="submit-bar" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <SubmitBar price={3050} label="Total：" buttonText="Submit" onSubmit={this.onSubmit} />
          </section>

          <section>
            <h2>Disabled</h2>
            <SubmitBar
              price={3050}
              label="Total："
              buttonText="Submit"
              tip="Some tips"
              tipIcon="info-o"
              disabled
              onSubmit={this.onSubmit}
            />
          </section>

          <section>
            <h2>Loading</h2>
            <SubmitBar price={3050} label="Total：" buttonText="Submit" onSubmit={this.onSubmit} loading />
          </section>

          <section>
            <h2>Advanced Usage</h2>
            <SubmitBar
              price={3050}
              label="Total："
              buttonText="Submit"
              tipNode={
                <div>
                  Some tips,{' '}
                  <a href="javascript:;" onClick={this.onClickLink}>
                    Link
                  </a>
                </div>
              }
              disabled={!this.state.checked}
              onSubmit={this.onSubmit}
            >
              <Checkbox
                shape="round"
                checked={this.state.checked}
                onClick={(): void => this.setState({ checked: !this.state.checked })}
              >
                Label
              </Checkbox>
            </SubmitBar>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
