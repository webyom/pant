import * as preact from 'preact';
import { Field } from '../../field';
import { Button } from '../../button';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
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
            <Field<string> defaultValue="" name="a1" title="Label" placeholder="Text"></Field>
          </section>

          <section>
            <h2>Custom Type</h2>
            <Field<string> defaultValue="" name="b1" title="Text" placeholder="Text"></Field>
            <Field<string> type="tel" defaultValue="" name="b2" title="Phone" placeholder="Phone"></Field>
            <Field<string> type="digit" defaultValue="" name="b3" title="Digit" placeholder="Digit"></Field>
            <Field<string> type="number" defaultValue="" name="b4" title="Number" placeholder="Number"></Field>
            <Field<string> type="password" defaultValue="" name="b5" title="Password" placeholder="Password"></Field>
          </section>

          <section>
            <h2>Disalbed</h2>
            <Field<string> defaultValue="" name="c1" title="Text" placeholder="Input Readonly" readonly></Field>
            <Field<string> defaultValue="" name="c2" title="Text" placeholder="Input Disabled" disabled></Field>
          </section>

          <section>
            <h2>Show Icon</h2>
            <Field<string>
              defaultValue=""
              name="d1"
              title="Text"
              placeholder="Show Icon"
              icon="smile-o"
              rightIcon="warning-o"
            ></Field>
            <Field<string>
              defaultValue="123"
              name="d2"
              title="Text"
              placeholder="Show Clear Icon"
              icon="music-o"
              clearable
            ></Field>
          </section>

          <section>
            <h2>Error Info</h2>
            <Field<string> defaultValue="" name="e1" title="Username" placeholder="Username" required></Field>
            <Field<string>
              defaultValue="123"
              name="e2"
              title="Phone"
              placeholder="Phone"
              errorMessage="Invalid phone"
              required
            ></Field>
          </section>

          <section>
            <h2>Insert Button</h2>
            <Field<string>
              defaultValue=""
              name="f1"
              title="SMS"
              placeholder="SMS"
              center
              button={
                <Button size="small" type="primary">
                  Send SMS
                </Button>
              }
            ></Field>
          </section>

          <section>
            <h2>Auto Resize</h2>
            <Field<string> type="textarea" defaultValue="" name="g1" placeholder="Message" autosize></Field>
          </section>

          <section>
            <h2>Show Word Limit</h2>
            <Field<string>
              type="textarea"
              defaultValue=""
              name="g1"
              title="Message"
              placeholder="Message"
              showWordLimit
              maxlength={50}
            ></Field>
          </section>

          <section>
            <h2>Input Align</h2>
            <Field<string>
              defaultValue=""
              name="g1"
              title="Text"
              placeholder="Input Align Right"
              inputAlign="right"
            ></Field>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
