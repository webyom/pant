import * as preact from 'preact';
import { Tag } from '../../tag';
import { Button } from '../../button';
import { toast } from '../../toast';
import { Card } from '../../card';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-card');

export class CardRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Card" type="card" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Card num="2" price="2.00" title="Title" desc="Description" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
          </section>

          <section>
            <h2>Discount Info</h2>
            <Card
              num="2"
              tag="Tag"
              price="2.00"
              title="Title"
              desc="Description"
              originPrice="10.00"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            />
          </section>

          <section>
            <h2>Custom Content</h2>
            <Card
              num="2"
              price="2.00"
              title="Title"
              desc="Description"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              tagsNode={
                <div>
                  <Tag type="danger">Tag</Tag> <Tag type="danger">Tag</Tag>
                </div>
              }
              footerNode={
                <div>
                  <Button size="mini" round>
                    Button
                  </Button>{' '}
                  <Button size="mini" round>
                    Button
                  </Button>
                </div>
              }
            />
          </section>

          <section>
            <h2>On Click Thumb</h2>
            <Card
              num="2"
              price="2.00"
              title="Title"
              desc="Description"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              onClickThumb={(): void => {
                toast('On Click Thumb');
              }}
            />
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
