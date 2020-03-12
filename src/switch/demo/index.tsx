import * as preact from 'preact';
import { dialog } from '../../dialog';
import { CellGroup } from '../../cell-group';
import { Cell } from '../../cell';
import { Switch, SwitchProps } from '../../switch';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-switch');

type SwitchRouteComponentState = {
  on1: boolean;
  on2: boolean;
  on3: boolean;
  on4: boolean;
  on5: boolean;
};

export class SwitchRouteComponent extends preact.Component<any, SwitchRouteComponentState> {
  state = {
    on1: false,
    on2: false,
    on3: true,
    on4: true,
    on5: false,
  };

  onClick(_: Event, props: SwitchProps): void {
    this.setState({ [props.name]: !props.on });
  }

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Switch" type="switch" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Switch name="on1" on={this.state.on1} onClick={this.onClick.bind(this)} />
          </section>

          <section>
            <h2>Disabled</h2>
            <Switch name="on1" on={this.state.on1} onClick={this.onClick.bind(this)} disabled />
          </section>

          <section>
            <h2>Loading</h2>
            <Switch name="on1" on={this.state.on1} onClick={this.onClick.bind(this)} loading />
          </section>

          <section>
            <h2>Custom Size</h2>
            <Switch name="on2" size="24px" on={this.state.on2} onClick={this.onClick.bind(this)} />
          </section>

          <section>
            <h2>Custom Color</h2>
            <Switch
              name="on3"
              activeColor="#07c160"
              inactiveColor="#ee0a24"
              on={this.state.on3}
              onClick={this.onClick.bind(this)}
            />
          </section>

          <section>
            <h2>Async Control</h2>
            <Switch
              name="on4"
              on={this.state.on4}
              onClick={(_: Event, props: SwitchProps): void => {
                const dialogRef = dialog({
                  message: 'Are you sure to toggle switch?',
                  showCancelButton: true,
                  onConfirmClick: (): void => {
                    this.setState({ on4: !props.on });
                    dialogRef.close();
                  },
                });
              }}
            />
          </section>

          <section className="cell">
            <h2>In a Cell</h2>
            <CellGroup border>
              <Cell
                title="Title"
                rightIcon={<Switch name="on5" size="24" on={this.state.on5} onClick={this.onClick.bind(this)} />}
              ></Cell>
            </CellGroup>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
