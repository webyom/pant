import * as preact from 'preact';
import { toast } from '../../toast';
import { Form } from '../../form';
import { Field } from '../../field';
import { Button } from '../../button';
import { CheckboxGroup } from '../../checkbox-group';
import { RadioGroup } from '../../radio-group';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-form');

export class FormRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Form" type="form" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Form<{ location: string }>
              onSubmit={(promise): void => {
                promise.then(res => {
                  if (!res.ok) {
                    toast(res.message);
                  }
                });
              }}
            >
              <Field<string>
                type="textarea"
                defaultValue=""
                name="location"
                title="Title"
                placeholder="Description"
                rightIcon="search"
                showWordLimit
                clearable
                autosize
                maxlength={100}
                validateTrigger={['change']}
                rules={[{ pattern: 'required', message: 'Required field', trigger: ['blur'] }]}
              ></Field>
              <Field
                type="checkbox"
                defaultValue={true}
                name="checkbox"
                title="Title"
                rules={[{ pattern: 'required', message: 'Required field', trigger: ['change'] }]}
              ></Field>
              <div className={bem('submit')}>
                <Button nativeType="submit" type="info" block round>
                  Submit
                </Button>
              </div>
            </Form>
          </section>

          <section>
            <h2>Switch</h2>
            <Field
              type="switch"
              defaultValue={true}
              inputAlign="right"
              name="switch"
              title="Title"
              rules={[{ pattern: 'required', message: 'Required field', trigger: ['change'] }]}
            ></Field>
          </section>

          <section>
            <h2>Checkbox Group</h2>
            <Field<[]>
              name="checkbox-group"
              title="Title"
              validateTrigger={['change']}
              rules={async (items): Promise<string> => {
                return items.length === 0 ? 'Required field' : items.length > 2 ? 'Max select 2' : '';
              }}
            >
              <CheckboxGroup
                shape="square"
                options={['Checkbox a', 'Checkbox b', 'Checkbox c']}
                defaultValue={['Checkbox a']}
              />
            </Field>
          </section>

          <section>
            <h2>Radio Group</h2>
            <Field<[]>
              name="radio-group"
              title="Title"
              validateTrigger={['change']}
              rules={async (items): Promise<string> => {
                return items.length === 0 ? 'Required field' : '';
              }}
            >
              <RadioGroup direction="horizontal" options={['Radio a', 'Radio b']} />
            </Field>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
