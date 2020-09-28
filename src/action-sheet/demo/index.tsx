import * as preact from 'preact';
import { toast } from '../../toast';
import { actionSheet } from '../../action-sheet';
import { CellGroup } from '../../cell-group';
import { Cell } from '../../cell';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-action-sheet');

export class ActionSheetRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="ActionSheet" type="action-sheet" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <CellGroup border>
              <Cell
                title="Basic Usage"
                rightIcon="arrow"
                onClick={(): void => {
                  actionSheet({
                    actions: [{ name: 'Option' }, { name: 'Option' }, { name: 'Option', subname: 'Description' }],
                    onSelect: function(item) {
                      toast(item.name);
                    },
                  });
                }}
              ></Cell>
              <Cell
                title="Show Cancel Button"
                rightIcon="arrow"
                onClick={(): void => {
                  actionSheet({
                    actions: [{ name: 'Option' }, { name: 'Option' }, { name: 'Option', subname: 'Description' }],
                    cancelText: 'Cancel',
                    onSelect: function(item) {
                      toast(item.name);
                    },
                  });
                }}
              ></Cell>
              <Cell
                title="Show Description"
                rightIcon="arrow"
                onClick={(): void => {
                  actionSheet({
                    actions: [{ name: 'Option' }, { name: 'Option' }, { name: 'Option', subname: 'Description' }],
                    description: 'Description',
                    onSelect: function(item) {
                      toast(item.name);
                    },
                  });
                }}
              ></Cell>
            </CellGroup>
          </section>

          <section>
            <h2>Option Status</h2>
            <CellGroup border>
              <Cell
                title="Option Status"
                rightIcon="arrow"
                onClick={(): void => {
                  actionSheet({
                    actions: [
                      { name: 'Option', color: '#07c160' },
                      { name: 'Option', loading: true },
                      { name: 'Disabled Option', disabled: true },
                    ],
                    cancelText: 'Cancel',
                    onSelect: function(item) {
                      toast(item.name);
                    },
                  });
                }}
              ></Cell>
            </CellGroup>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
