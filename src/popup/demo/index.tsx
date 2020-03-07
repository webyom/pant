import * as preact from 'preact';
import { Popup } from '../../popup';
import { CellGroup } from '../../cell-group';
import { Cell } from '../../cell';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-popup');

type PopupRouteComponentState = {
  show1: boolean;
};

export class PopupRouteComponent extends preact.Component<any, PopupRouteComponentState> {
  state: PopupRouteComponentState = {
    show1: false,
  };

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Popup" type="popup" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <CellGroup border>
              <Cell
                title="Show Popup"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show1: true });
                }}
              ></Cell>
            </CellGroup>
            <Popup show={this.state.show1} customStyle={{ padding: '30px 50px' }}>
              Content
            </Popup>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
