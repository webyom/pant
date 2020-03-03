import * as preact from 'preact';
import { toast } from '../../toast';
import { Button } from '../../button';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-button');

export class ButtonRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Button" type="button" />
        <div className={bem()}>
          <section>
            <h2>Type</h2>
            <Button type="default">Default</Button>
            <Button type="primary">Primary</Button>
            <Button type="info">Info</Button>
            <Button type="danger">Danger</Button>
            <Button type="warning">Warning</Button>
          </section>

          <section>
            <h2>Plain</h2>
            <Button plain type="primary">
              Primary
            </Button>
            <Button plain type="info">
              Danger
            </Button>
          </section>

          <section>
            <h2>Hairline</h2>
            <Button plain hairline type="primary">
              Hairline
            </Button>
            <Button plain hairline type="info">
              Hairline
            </Button>
          </section>

          <section>
            <h2>Disabled</h2>
            <Button disabled type="primary">
              Diabled
            </Button>
            <Button disabled type="info">
              Diabled
            </Button>
          </section>

          <section>
            <h2>Loading</h2>
            <Button loading type="primary" />
            <Button loading type="primary" loadingType="spinner" />
            <Button loading type="info" loadingText="Loading..." />
          </section>

          <section>
            <h2>Shape</h2>
            <Button square type="primary">
              Square
            </Button>
            <Button round type="info">
              Round
            </Button>
          </section>

          <section>
            <h2>Icon</h2>
            <Button icon="star-o" type="primary" />
            <Button icon="star-o" type="primary">
              Button
            </Button>
            <Button icon="https://img.yzcdn.cn/vant/logo.png" type="primary" plain>
              Button
            </Button>
          </section>

          <section>
            <h2>Size</h2>
            <Button type="primary" size="large">
              Large
            </Button>
            <Button type="primary" size="normal">
              Normal
            </Button>
            <Button type="primary" size="small">
              Small
            </Button>
            <Button type="primary" size="mini">
              Mini
            </Button>
          </section>

          <section>
            <h2>Block Element</h2>
            <Button type="primary" block>
              Block Element
            </Button>
          </section>

          <section>
            <h2>Route</h2>
            <Button type="primary" url="https://github.com/webyom/pant">
              URL
            </Button>
            <Button type="primary" url="/">
              Preact Router
            </Button>
          </section>

          <section>
            <h2>On Click</h2>
            <Button
              type="primary"
              onClick={(): void => {
                toast('On Click');
              }}
            >
              On Click
            </Button>
          </section>

          <section>
            <h2>Custom Color</h2>
            <Button color="#7232dd">Pure</Button>
            <Button color="#7232dd" plain>
              Pure
            </Button>
            <Button color="linear-gradient(to right, #4bb0ff, #6149f6)">Gradient</Button>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
