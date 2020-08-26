import * as preact from 'preact';
import { Field } from '../../field';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-field');

export class FieldRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Field" type="field" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Field<number>
              defaultValue={1}
              name="location"
              title="Cell title"
              placeholder="Description"
              icon="location"
              rightIcon="search"
              showWordLimit
              clearable
              maxlength={100}
            ></Field>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
