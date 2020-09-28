import * as preact from 'preact';
import { toast } from '../../toast';
import { Tag } from '../../tag';
import { CellGroup } from '../../cell-group';
import { Cell } from '../../cell';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-cell');

export class CellRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Cell" type="cell" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <CellGroup border>
              <Cell title="Cell title">Content</Cell>
              <Cell title="Cell title" label="Description">
                Content
              </Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Size</h2>
            <CellGroup border>
              <Cell title="Cell title" size="large">
                Content
              </Cell>
              <Cell title="Cell title" label="Description" size="large">
                Content
              </Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Left Icon</h2>
            <CellGroup border>
              <Cell title="Cell title" icon="location-o">
                Content
              </Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Value Only</h2>
            <CellGroup border>
              <Cell>Content</Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Clickable</h2>
            <CellGroup border>
              <Cell
                title="Cell title"
                rightIcon="arrow"
                onClick={(): void => {
                  toast('Clicked');
                }}
              ></Cell>
              <Cell
                title="Cell title"
                rightIcon="arrow"
                onClick={(): void => {
                  toast('Clicked');
                }}
              >
                Content
              </Cell>
              <Cell
                title="Cell title"
                rightIcon="arrow-down"
                onClick={(): void => {
                  toast('Clicked');
                }}
              >
                Content
              </Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Group Title</h2>
            <CellGroup title="Group 1" border>
              <Cell title="Cell title">Content</Cell>
            </CellGroup>
            <CellGroup title="Group 2" border>
              <Cell title="Cell title">Content</Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Use VNode</h2>
            <CellGroup border>
              <Cell
                title={[<span>Cell title</span>, ' ', <Tag type="danger">Tag</Tag>]}
                rightIcon="arrow"
                onClick={(): void => {
                  toast('Clicked');
                }}
              >
                Content
              </Cell>
              <Cell icon="shop-o" title="Cell title" rightIcon="search"></Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Vertical Center</h2>
            <CellGroup border>
              <Cell title="Cell title" label="Description" center>
                Content
              </Cell>
            </CellGroup>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
