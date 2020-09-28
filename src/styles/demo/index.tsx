import * as preact from 'preact';
import { Transition, TransitionName, TransitionStage } from '../../transition';
import { CellGroup } from '../../cell-group';
import { Cell } from '../../cell';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-styles');

type StylesRouteComponentState = {
  name: TransitionName;
  stage: TransitionStage;
};

export class StylesRouteComponent extends preact.Component<any, StylesRouteComponentState> {
  state: StylesRouteComponentState = {
    name: 'fade',
    stage: 'leave',
  };

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Styles" type="styles" />
        <div className={bem()}>
          <section>
            <h2>Text Ellipsis</h2>
            <div class="pant-ellipsis">
              This is a paragraph that displays up to one line of text, and the rest of the text will be omitted.
            </div>

            <div class="pant-multi-ellipsis--l2">
              This is a paragraph that displays up to two lines of text, and the rest of the text will be omitted.
            </div>
          </section>

          <section>
            <h2>Hairline</h2>
            <div class="pant-hairline--top"></div>
          </section>

          <section>
            <h2>Animation</h2>
            <CellGroup border>
              <Cell
                title="Fade"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ name: 'fade', stage: 'enter' });
                }}
              ></Cell>
              <Cell
                title="Slide Up"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ name: 'slide-up', stage: 'enter' });
                }}
              ></Cell>
              <Cell
                title="Slide Down"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ name: 'slide-down', stage: 'enter' });
                }}
              ></Cell>
              <Cell
                title="Slide Left"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ name: 'slide-left', stage: 'enter' });
                }}
              ></Cell>
              <Cell
                title="Slide Right"
                rightIcon="arrow"
                onClick={(): void => {
                  this.setState({ name: 'slide-right', stage: 'enter' });
                }}
              ></Cell>
            </CellGroup>
            <Transition
              {...this.state}
              onAfterEnter={(): void => {
                this.setState({ stage: 'leave' });
              }}
            >
              <div className="demo-animate-block"></div>
            </Transition>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
