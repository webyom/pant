import * as preact from 'preact';
import { Sticky } from '../../sticky';
import { Button } from '../../button';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-sticky');

export class StickyRouteComponent extends preact.Component {
  private containerRef = preact.createRef();

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Sticky" type="sticky" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Sticky>
              <Button type="primary">Basic Usage</Button>
            </Sticky>
          </section>

          <section>
            <h2>Offset Top</h2>
            <Sticky offsetTop="50">
              <Button type="info" customStyle={{ marginLeft: '100px' }}>
                Offset Top
              </Button>
            </Sticky>
          </section>

          <section>
            <h2>Set Container</h2>
            <div ref={this.containerRef} className="sticky-container">
              <Sticky offsetTop="50" container={this.containerRef}>
                <Button type="warning" customStyle={{ marginLeft: '210px' }}>
                  Set Container
                </Button>
              </Sticky>
            </div>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
