import * as preact from 'preact';
import { Button } from '../../button';
import { toast } from '../../toast';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-toast');

export class ToastRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Toast" type="toast" />
        <div className={bem()}>
          <section>
            <h2>Text</h2>
            <Button
              type="primary"
              onClick={(): void => {
                toast({ message: 'Some messages' });
              }}
            >
              Text
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                toast({ message: 'This is a long message, text will wrap when over a certain length' });
              }}
            >
              Long Text
            </Button>
          </section>

          <section>
            <h2>Loading</h2>
            <Button
              type="primary"
              onClick={(): void => {
                toast({ message: 'Loading...', loading: true, overlay: true, closeOnClick: true });
              }}
            >
              Loading
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                toast({
                  message: 'Loading...',
                  loading: true,
                  overlay: true,
                  loadingType: 'spinner',
                  closeOnClick: true,
                });
              }}
            >
              Loading Type
            </Button>
          </section>

          <section>
            <h2>Success/Fail</h2>
            <Button
              type="info"
              onClick={(): void => {
                toast({ message: 'Success', icon: 'success' });
              }}
            >
              Success
            </Button>
            <Button
              type="danger"
              onClick={(): void => {
                toast({ message: 'Fail', icon: 'fail' });
              }}
            >
              Fail
            </Button>
          </section>

          <section>
            <h2>Custom Icon</h2>
            <Button
              type="primary"
              onClick={(): void => {
                toast({ message: 'Custom Icon', icon: 'like-o' });
              }}
            >
              Custom Icon
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                toast({ message: 'Custom Image', icon: 'https://img.yzcdn.cn/vant/logo.png' });
              }}
            >
              Custom Image
            </Button>
          </section>

          <section>
            <h2>Event</h2>
            <Button
              type="primary"
              onClick={(): void => {
                toast({
                  message: 'On Opened',
                  onOpened: function() {
                    alert('On Opened');
                  },
                });
              }}
            >
              On Opened
            </Button>
            <Button
              type="primary"
              onClick={(): void => {
                toast({
                  message: 'On Closed',
                  onClosed: function() {
                    alert('On Closed');
                  },
                });
              }}
            >
              On Closed
            </Button>
          </section>

          <section>
            <h2>Update Message</h2>
            <Button
              type="primary"
              onClick={(): void => {
                let seconds = 3;
                const t = toast({ message: `${seconds} seconds`, loading: true, overlay: true, duration: 0 });
                setTimeout(function timer() {
                  seconds--;
                  if (seconds > 0) {
                    t.setMessage(`${seconds} seconds`);
                    setTimeout(timer, 1000);
                  } else {
                    t.clear();
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
