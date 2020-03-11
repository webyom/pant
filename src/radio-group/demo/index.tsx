import * as preact from 'preact';
import { toast } from '../../toast';
import { RadioGroup } from '../../radio-group';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-radio');

export class RadioRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Radio" type="radio-group" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <RadioGroup
              options={['Radio a', 'Radio b']}
              defaultValue="Radio a"
              onChange={(value): void => {
                toast(value.join(', ') || 'Empty');
              }}
            />
          </section>

          <section>
            <h2>Hrizontal</h2>
            <RadioGroup options={['Radio a', 'Radio b']} defaultValue="Radio a" direction="horizontal" />
          </section>

          <section>
            <h2>Disabled</h2>
            <RadioGroup options={['Radio a', 'Radio b']} defaultValue="Radio a" disabled />
          </section>

          <section>
            <h2>Custom Shape</h2>
            <RadioGroup options={['Radio a', 'Radio b']} defaultValue="Radio a" shape="square" />
          </section>

          <section>
            <h2>Custom Color</h2>
            <RadioGroup options={['Radio a', 'Radio b']} defaultValue="Radio a" checkedColor="#07c160" />
          </section>

          <section>
            <h2>Custom Icon Size</h2>
            <RadioGroup options={['Radio a', 'Radio b']} defaultValue="Radio a" iconSize="24px" />
          </section>

          <section>
            <h2>Custom Icon</h2>
            <RadioGroup
              activeIconNode={<img src="https://img.yzcdn.cn/vant/user-active.png" />}
              inactiveIconNode={<img src="https://img.yzcdn.cn/vant/user-inactive.png" />}
              options={[
                {
                  label: 'Radio a',
                  value: 'a',
                },
                {
                  label: 'Radio b',
                  value: 'b',
                },
              ]}
              defaultValue="a"
            />
          </section>

          <section>
            <h2>Custom Label Click</h2>
            <RadioGroup options={['Radio a', 'Radio b']} defaultValue="Radio a" labelDisabled />
          </section>

          <section class="cell">
            <RadioGroup
              cellGroup={{ border: true, title: 'Inside a Cell' }}
              options={['Radio a', 'Radio b', 'Radio c']}
              defaultValue="Radio a"
            />
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
