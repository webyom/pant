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
  show2: boolean;
  show3: boolean;
  show4: boolean;
  show5: boolean;
  show6: boolean;
  show7: boolean;
  show8: boolean;
  show9: boolean;
  show10: boolean;
};

export class PopupRouteComponent extends preact.Component<any, PopupRouteComponentState> {
  state: PopupRouteComponentState = {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show7: false,
    show8: false,
    show9: false,
    show10: false,
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
            <Popup
              show={this.state.show1}
              customStyle={{ padding: '30px 50px' }}
              onClose={(): void => {
                this.setState({ show1: false });
              }}
            >
              Content
            </Popup>
          </section>

          <section>
            <h2>Position</h2>
            <CellGroup border>
              <Cell
                title="From Top"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show2: true });
                }}
              ></Cell>
              <Cell
                title="From Bottom"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show3: true });
                }}
              ></Cell>
              <Cell
                title="From Left"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show4: true });
                }}
              ></Cell>
              <Cell
                title="From Right"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show5: true });
                }}
              ></Cell>
            </CellGroup>
            <Popup
              show={this.state.show2}
              position="top"
              customStyle={{ height: '30%' }}
              onClose={(): void => {
                this.setState({ show2: false });
              }}
            ></Popup>
            <Popup
              show={this.state.show3}
              position="bottom"
              customStyle={{ height: '30%' }}
              onClose={(): void => {
                this.setState({ show3: false });
              }}
            ></Popup>
            <Popup
              show={this.state.show4}
              position="left"
              customStyle={{ width: '30%', height: '100%' }}
              onClose={(): void => {
                this.setState({ show4: false });
              }}
            ></Popup>
            <Popup
              show={this.state.show5}
              position="right"
              customStyle={{ width: '30%', height: '100%' }}
              onClose={(): void => {
                this.setState({ show5: false });
              }}
            ></Popup>
          </section>

          <section>
            <h2>Close Icon</h2>
            <CellGroup border>
              <Cell
                title="Close Icon"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show6: true });
                }}
              ></Cell>
              <Cell
                title="Custom Icon"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show7: true });
                }}
              ></Cell>
              <Cell
                title="Icon Position"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show8: true });
                }}
              ></Cell>
            </CellGroup>
            <Popup
              show={this.state.show6}
              position="bottom"
              customStyle={{ height: '30%' }}
              closeable
              onClose={(): void => {
                this.setState({ show6: false });
              }}
            ></Popup>
            <Popup
              show={this.state.show7}
              position="bottom"
              customStyle={{ height: '30%' }}
              closeable
              closeIcon="close"
              onClose={(): void => {
                this.setState({ show7: false });
              }}
            ></Popup>
            <Popup
              show={this.state.show8}
              position="bottom"
              customStyle={{ height: '30%' }}
              closeable
              closeIconPosition="top-left"
              onClose={(): void => {
                this.setState({ show8: false });
              }}
            ></Popup>
          </section>

          <section>
            <h2>Round Corner</h2>
            <CellGroup border>
              <Cell
                title="Round Corner"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ show9: true });
                }}
              ></Cell>
            </CellGroup>
            <Popup
              show={this.state.show9}
              position="bottom"
              customStyle={{ height: '30%' }}
              round
              onClose={(): void => {
                this.setState({ show9: false });
              }}
            ></Popup>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
