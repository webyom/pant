import * as preact from 'preact';
import { Button } from '../../button';
import { Overlay } from '../../overlay';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-overlay');

type OverlayState = {
  show1: boolean;
  show2: boolean;
};

export class OverlayRouteComponent extends preact.Component<any, OverlayState> {
  state = {
    show1: false,
    show2: false,
  };

  toggle1(): void {
    this.setState({ show1: !this.state.show1 });
  }

  toggle2(): void {
    this.setState({ show2: !this.state.show2 });
  }

  render(): preact.JSX.Element {
    const { show1, show2 } = this.state;

    return (
      <preact.Fragment>
        <NavBar title="Overlay" type="overlay" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Button type="primary" onClick={this.toggle1.bind(this)}>
              Show Overlay
            </Button>
            <Overlay show={show1} onClick={this.toggle1.bind(this)} />
          </section>

          <section>
            <h2>Embedded Content</h2>
            <Button type="primary" onClick={this.toggle2.bind(this)}>
              Show Embedded Content
            </Button>
            <Overlay show={show2} onClick={this.toggle2.bind(this)}>
              <div class="wrapper">
                <div class="block" onClick={(evt): void => evt.stopPropagation()} />
              </div>
            </Overlay>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
