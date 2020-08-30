import * as preact from 'preact';
import { Tabs, Tab } from '../../tab';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-tab');

export class TabRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Tab" type="tab" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Tabs activeName="e" scrollable>
              <Tab name="a" title="Tab 1">
                content of tab 1
              </Tab>
              <Tab name="b" title="Tab 2">
                content of tab 2
              </Tab>
              <Tab name="c" title="Tab 3">
                content of tab 3
              </Tab>
              <Tab name="d" title="Tab 4">
                content of tab 4
              </Tab>
              <Tab name="e" title="Tab 5">
                content of tab 5
              </Tab>
              <Tab name="f" title="Tab 6">
                content of tab 6
              </Tab>
              <Tab name="g" title="Tab 7">
                content of tab 7
              </Tab>
              <Tab name="h" title="Tab 8">
                content of tab 8
              </Tab>
            </Tabs>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
