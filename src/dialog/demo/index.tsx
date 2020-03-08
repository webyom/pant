import * as preact from 'preact';
import { Button } from '../../button';
import { dialog } from '../../dialog';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-dialog');

export class DialogRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Dialog" type="dialog" />
        <div className={bem()}>
          <section>
            <h2>Alert</h2>
            <Button
              type="primary"
              onClick={(): void => {
                dialog({ title: 'Title', message: 'Content' });
              }}
            >
              Alert
            </Button>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
