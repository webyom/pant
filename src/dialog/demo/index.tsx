import * as preact from 'preact';
import { Button } from '../../button';
import { openDialog } from '../../dialog';
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
                openDialog({ title: 'Title', message: 'Content' });
              }}
            >
              Alert
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                openDialog('Content');
              }}
            >
              Alert without title
            </Button>
          </section>

          <section>
            <h2>Confirm Dialog</h2>
            <Button
              type="primary"
              onClick={(): void => {
                openDialog({ title: 'Title', message: 'Content', showCancelButton: true });
              }}
            >
              Confirm Dialog
            </Button>
          </section>

          <section>
            <h2>Async Close</h2>
            <Button
              type="primary"
              onClick={(): void => {
                const dialog = openDialog({
                  title: 'Title',
                  message: 'Content',
                  showCancelButton: true,
                  onConfirmClick: function(): void {
                    dialog.update({ confirmLoading: true });
                    setTimeout(dialog.close, 2000);
                  },
                });
              }}
            >
              Async Close
            </Button>
          </section>

          <section>
            <h2>Component Call</h2>
            <Button
              type="primary"
              onClick={(): void => {
                openDialog({
                  title: 'Title',
                  messageNode: <img src="https://img.yzcdn.cn/vant/apple-3.jpg" style="width: 100%; padding: 20px;" />,
                  showCancelButton: true,
                });
              }}
            >
              Component Call
            </Button>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
