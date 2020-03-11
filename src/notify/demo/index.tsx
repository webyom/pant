import * as preact from 'preact';
import { Button } from '../../button';
import { notify } from '../../notify';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-notify');

export class NotifyRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Notify" type="notify" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Button
              type="primary"
              onClick={(): void => {
                notify('Notify Message');
              }}
            >
              Basic Usage
            </Button>
          </section>

          <section>
            <h2>Notify Type</h2>
            <Button
              type="info"
              onClick={(): void => {
                notify('Notify Message', 'primary');
              }}
            >
              Primary
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                notify('Notify Message', 'success');
              }}
            >
              Success
            </Button>
            <Button
              type="danger"
              onClick={(): void => {
                notify('Notify Message', 'danger');
              }}
            >
              Danger
            </Button>
            <Button
              type="warning"
              onClick={(): void => {
                notify('Notify Message', 'warning');
              }}
            >
              Warning
            </Button>
          </section>

          <section>
            <h2>Custom Notify</h2>
            <Button
              type="primary"
              onClick={(): void => {
                notify({ message: 'Custom Color', color: '#ad0000', background: '#ffe1e1' });
              }}
            >
              Custom Color
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                notify({ message: 'Custom Duration', duration: 5000 });
              }}
            >
              Custom Duration
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                notify({ message: 'Clear on Close', duration: 10000, clearOnClick: true });
              }}
            >
              Clear on Close
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                notify({
                  message: 'Fade Leave',
                  fadeLeave: true,
                });
              }}
            >
              Fade Leave
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                notify({
                  message: 'Custom Style',
                  customStyle: { margin: '10px', borderRadius: '3px' },
                });
              }}
            >
              Custom Style
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                notify({
                  message: 'Custom Position',
                  position: 'bottom',
                });
              }}
            >
              Custom Position
            </Button>
          </section>

          <section>
            <h2>Update Message</h2>
            <Button
              type="primary"
              onClick={(): void => {
                let seconds = 3;
                const notifyRef = notify({ message: `${seconds} seconds`, duration: 0 });
                setTimeout(function timer() {
                  seconds--;
                  if (seconds > 0) {
                    notifyRef.setMessage(`${seconds} seconds`);
                    setTimeout(timer, 1000);
                  } else {
                    notifyRef.clear();
                  }
                }, 1000);
              }}
            >
              Update Message
            </Button>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
