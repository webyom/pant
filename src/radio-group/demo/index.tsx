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
        </div>
      </preact.Fragment>
    );
  }
}
