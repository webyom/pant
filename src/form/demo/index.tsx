import * as preact from 'preact';
import { toast } from '../../toast';
import { Form } from '../../form';
import { Field } from '../../field';
import { Button } from '../../button';
import { CheckboxGroup } from '../../checkbox-group';
import { RadioGroup } from '../../radio-group';
import { Popup } from '../../popup';
import { Picker } from '../../picker';
import { columns1, columns3 } from '../../picker/demo/constant';
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
                const t = toast({
                  message: 'Validating...',
                  overlay: true,
                  loading: true,
                });
                promise.then(res => {
                  t.clear();
                  if (!res.ok) {
                    toast(res.message);
                  }
                });
              }}
            >
              <Field<string>
                defaultValue=""
                name="username"
                title="Username"
                placeholder="Username"
                rules={[
                  { pattern: 'required', message: 'Username is required', trigger: ['change'] },
                  async (value): Promise<string | void> => {
                    return new Promise(resolve => {
                      setTimeout(resolve.bind(null, `${value} is used`), 2000);
                    });
                  },
                ]}
              ></Field>
              <Field<string>
                type="password"
                defaultValue=""
                name="password"
                title="Password"
                placeholder="Password"
                rules={[{ pattern: 'required', message: 'Password is required', trigger: ['change'] }]}
              ></Field>
              <div className={bem('submit')}>
                <Button nativeType="submit" type="info" block round>
                  Submit
                </Button>
              </div>
            </Form>
          </section>

          <section>
            <h2>Validate Rules</h2>
            <Form<{ location: string }>
              onSubmit={(promise): void => {
                const t = toast({
                  message: 'Validating...',
                  overlay: true,
                  loading: true,
                });
                promise.then(res => {
                  t.clear();
                  if (!res.ok) {
                    toast(res.message);
                  }
                });
              }}
            >
              <Field<string>
                defaultValue=""
                name="a1"
                title="Label"
                placeholder="Use pattern"
                rules={[
                  { pattern: 'required', message: 'Required field', trigger: ['change', 'blur'] },
                  { pattern: /^a|^$/, message: 'Must be start with "a"', trigger: ['blur'] },
                ]}
              ></Field>
              <Field<string>
                defaultValue=""
                name="a2"
                title="Label"
                placeholder="Use validator"
                rules={[
                  {
                    validator: async (value): Promise<string | void> => {
                      return value ? '' : 'Required field';
                    },
                    trigger: ['change', 'blur'],
                  },
                  async (value): Promise<string | void> => {
                    return /^a|^$/.test(value) ? '' : 'Must be start with "a"';
                  },
                ]}
              ></Field>
              <Field<string>
                defaultValue=""
                name="a3"
                title="Label"
                placeholder="Use async validator"
                rules={[
                  {
                    validator: async (value): Promise<string | void> => {
                      if (!value) {
                        return;
                      }
                      const t = toast({
                        message: 'Validating...',
                        overlay: true,
                        loading: true,
                      });
                      return new Promise<string | void>(resolve => {
                        setTimeout(resolve.bind(null, value !== 'gary' ? `${value} is used` : ''), 2000);
                      }).then(msg => {
                        t.clear();
                        return msg;
                      });
                    },
                    trigger: ['blur'],
                  },
                ]}
              ></Field>
              <div className={bem('submit')}>
                <Button nativeType="submit" type="info" block round>
                  Submit
                </Button>
              </div>
            </Form>
          </section>

          <section>
            <h2>Field Type</h2>
            <Form<{ location: string }>
              onSubmit={(promise): void => {
                const t = toast({
                  message: 'Validating...',
                  overlay: true,
                  loading: true,
                });
                promise.then(res => {
                  t.clear();
                  if (res.ok) {
                    toast({
                      message: JSON.stringify(res.data, null, 2),
                      textAlign: 'left',
                      duration: 10000,
                      clearOnClick: true,
                    });
                  } else {
                    toast(res.message);
                  }
                });
              }}
            >
              <Field<boolean>
                type="switch"
                defaultValue={true}
                inputAlign="right"
                name="switch"
                title="Switch"
                rules={[{ pattern: 'required', message: 'Required field', trigger: ['change'] }]}
              ></Field>
              <Field<[]>
                name="checkbox-group"
                title="Checkbox Group"
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
              <Field<[]>
                name="radio-group"
                title="Radio Group"
                validateTrigger={['change']}
                rules={async (value): Promise<string> => {
                  return value ? '' : 'Required field';
                }}
              >
                <RadioGroup direction="horizontal" options={['Radio a', 'Radio b']} />
              </Field>
              <Field<any[]>
                name="city"
                title="Picker"
                placeholder="Select city"
                valueFormatter={(value): any => {
                  return value[0];
                }}
                displayValueFormatter={(value): string => {
                  return columns1[value];
                }}
              >
                <Popup round position="bottom" closeOnClickOverlay>
                  <Picker columns={columns1} />
                </Popup>
              </Field>
              <Field<any[]>
                name="location"
                title="Cascade"
                placeholder="Select Location"
                validateTrigger={['change']}
                rules={async (value): Promise<string> => {
                  return value ? '' : 'Required field';
                }}
                valueFormatter={(value): any => {
                  return {
                    province: value[0],
                    city: value[1],
                    district: value[2],
                  };
                }}
                displayValueFormatter={(value): string => {
                  const parts: string[] = [];
                  const province = columns3[value.province];
                  if (province) {
                    parts.push(province.text);
                    const city = province.children[value.city];
                    if (city) {
                      parts.push(city.text);
                      const district = city.children[value.district];
                      if (district) {
                        parts.push(district.text);
                      }
                    }
                  }
                  return parts.join('/');
                }}
              >
                <Popup round position="bottom" closeOnClickOverlay>
                  <Picker columns={columns3} />
                </Popup>
              </Field>
              <div className={bem('submit')}>
                <Button nativeType="submit" type="info" block round>
                  Submit
                </Button>
              </div>
            </Form>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
