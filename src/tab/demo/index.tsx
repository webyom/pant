import * as preact from 'preact';
import { toast } from '../../toast/index';
import { Icon } from '../../icon';
import { Loading } from '../../loading';
import { Tabs, Tab, TabInfo } from '../../tab';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-tab');

class LazyContent extends preact.Component<{}, { inited: boolean }> {
  state = {
    inited: false,
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ inited: true });
    }, 2000);
  }

  render(): preact.JSX.Element {
    return this.state.inited ? (
      <preact.Fragment>{this.props.children}</preact.Fragment>
    ) : (
      <Loading size="22" vertical />
    );
  }
}

export class TabRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Tab" type="tab" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Tabs activeIndex="2">
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
              <Tab title="Tab 3">content of tab 4</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Matched by Name</h2>
            <Tabs activeName="c">
              <Tab name="a" title="Tab 1">
                content of tab 1
              </Tab>
              <Tab name="b" title="Tab 2">
                content of tab 2
              </Tab>
              <Tab name="c" title="Tab 3">
                content of tab 3
              </Tab>
            </Tabs>
          </section>

          <section>
            <h2>Swipe Tabs</h2>
            <Tabs scrollable>
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
              <Tab title="Tab 4">content of tab 4</Tab>
              <Tab title="Tab 5">content of tab 5</Tab>
              <Tab title="Tab 6">content of tab 6</Tab>
              <Tab title="Tab 7">content of tab 7</Tab>
              <Tab title="Tab 8">content of tab 8</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Disabled Tab</h2>
            <Tabs
              onClick={(evt: Event, info: TabInfo): void => {
                if (info.disabled) {
                  toast(`${info.title} is disabled`);
                }
              }}
            >
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2" disabled>
                content of tab 2
              </Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Card Style</h2>
            <Tabs type="card">
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Click Event</h2>
            <Tabs
              onClick={(evt: Event, info: TabInfo): void => {
                toast(`${info.title}`);
              }}
            >
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Sticky</h2>
            <Tabs activeName="e" sticky>
              <Tab name="a" title="Tab 1">
                content of tab 1
              </Tab>
              <Tab name="b" title="Tab 2">
                content of tab 2
              </Tab>
              <Tab name="c" title="Tab 3">
                content of tab 3
              </Tab>
            </Tabs>
          </section>

          <section>
            <h2>Custom Tab</h2>
            <Tabs>
              <Tab
                title="Tab 1"
                titleNode={
                  <preact.Fragment>
                    <Icon name="more-o" /> Tab 1
                  </preact.Fragment>
                }
              >
                content of tab 1
              </Tab>
              <Tab
                title="Tab 2"
                titleNode={
                  <preact.Fragment>
                    <Icon name="more-o" /> Tab 2
                  </preact.Fragment>
                }
              >
                content of tab 2
              </Tab>
            </Tabs>
          </section>

          <section>
            <h2>Lazy Render</h2>
            <Tabs animated>
              <Tab title="Tab 1" lazyRender>
                <LazyContent>content of tab 1</LazyContent>
              </Tab>
              <Tab title="Tab 2" lazyRender>
                <LazyContent>content of tab 2</LazyContent>
              </Tab>
              <Tab title="Tab 3" lazyRender>
                <LazyContent>content of tab 3</LazyContent>
              </Tab>
              <Tab title="Tab 4" lazyRender>
                <LazyContent>content of tab 4</LazyContent>
              </Tab>
            </Tabs>
          </section>

          <section>
            <h2>Switch Animation</h2>
            <Tabs animated>
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
              <Tab title="Tab 4">content of tab 4</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Swipeable</h2>
            <Tabs animated swipeable>
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
              <Tab title="Tab 4">content of tab 4</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Info Tab</h2>
            <Tabs>
              <Tab title="Tab 1" dot>
                content of tab 1
              </Tab>
              <Tab title="Tab 2" info="10">
                content of tab 2
              </Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Scollspy</h2>
            <Tabs scrollable scrollspy sticky>
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
              <Tab title="Tab 4">content of tab 4</Tab>
              <Tab title="Tab 5">content of tab 5</Tab>
              <Tab title="Tab 6">content of tab 6</Tab>
              <Tab title="Tab 7">content of tab 7</Tab>
              <Tab title="Tab 8">content of tab 8</Tab>
            </Tabs>
          </section>

          <section>
            <h2>Before Change</h2>
            <Tabs
              onBeforeChange={async (info): Promise<boolean> => {
                if (info.index % 2 !== 0) {
                  toast('Can not change');
                  return false;
                }
                const disposer = toast({
                  message: 'Loading...',
                  loading: true,
                });
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve(true);
                    disposer.clear();
                  }, 1000);
                });
              }}
            >
              <Tab title="Tab 1">content of tab 1</Tab>
              <Tab title="Tab 2">content of tab 2</Tab>
              <Tab title="Tab 3">content of tab 3</Tab>
              <Tab title="Tab 4">content of tab 4</Tab>
            </Tabs>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
