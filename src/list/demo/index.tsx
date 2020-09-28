import * as preact from 'preact';
import { Cell } from '../../cell';
import { Tabs, Tab } from '../../tab';
import { PullRefresh } from '../../pull-refresh';
import { List, ListLoadResult } from '../../list';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-list');

export class ListRouteComponent extends preact.Component<any, { list1: number[]; list2: number[]; list3: number[] }> {
  private list3Ref = preact.createRef<List>();

  constructor(props: any) {
    super(props);
    this.state = {
      list1: [],
      list2: [],
      list3: [],
    };
  }

  private genList(start: number, end: number): number[] {
    const res: number[] = [];
    for (let i = start; i < end; i++) {
      res.push(i + 1);
    }
    return res;
  }

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="List" type="list" />
        <div className={bem()}>
          <Tabs scrollable>
            <Tab title="Basic Usage" lazyRender>
              <List
                finishedText="Finished"
                onLoad={(): Promise<ListLoadResult> => {
                  return new Promise(resolve => {
                    setTimeout(() => {
                      const list1 = this.state.list1;
                      this.setState({ list1: list1.concat(this.genList(list1.length, list1.length + 10)) }, () => {
                        resolve({
                          finished: this.state.list1.length >= 40,
                        });
                      });
                    }, 2000);
                  });
                }}
              >
                {this.state.list1.map(i => (
                  <Cell title={i}></Cell>
                ))}
              </List>
            </Tab>
            <Tab title="Error Info" lazyRender>
              <List
                errorText="Request failed. Click to reload"
                onLoad={(): Promise<ListLoadResult> => {
                  return new Promise(resolve => {
                    setTimeout(() => {
                      const list2 = this.state.list2;
                      this.setState({ list2: list2.concat(this.genList(list2.length, list2.length + 10)) }, () => {
                        resolve({
                          error: this.state.list2.length === 10,
                          finished: this.state.list2.length >= 40,
                        });
                      });
                    }, 2000);
                  });
                }}
              >
                {this.state.list2.map(i => (
                  <Cell title={i}></Cell>
                ))}
              </List>
            </Tab>
            <Tab title="PullRefresh" lazyRender>
              <PullRefresh
                onRefresh={(): Promise<void> => {
                  return new Promise(resolve => {
                    setTimeout(() => {
                      this.setState({ list3: this.genList(0, 10) }, () => {
                        this.list3Ref.current.reset();
                      });
                      resolve();
                    }, 2000);
                  });
                }}
              >
                <List
                  ref={this.list3Ref}
                  finishedText="Finished"
                  onLoad={(): Promise<ListLoadResult> => {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        const list3 = this.state.list3;
                        this.setState({ list3: list3.concat(this.genList(list3.length, list3.length + 10)) }, () => {
                          resolve({
                            finished: this.state.list3.length >= 40,
                          });
                        });
                      }, 2000);
                    });
                  }}
                >
                  {this.state.list3.map(i => (
                    <Cell title={i}></Cell>
                  ))}
                </List>
              </PullRefresh>
            </Tab>
          </Tabs>
        </div>
      </preact.Fragment>
    );
  }
}
