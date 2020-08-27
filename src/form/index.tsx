import * as preact from 'preact';
import { preventDefault } from '../utils/event';
import { createBEM } from '../utils/bem';
import { Field, ValidateTrigger } from '../field';

export type SubmitResult<T = any> = {
  ok: boolean;
  message: string;
  data: T;
};

export type FormProps<T> = {
  validateTrigger?: ValidateTrigger[];
  onSubmit?: (res: Promise<SubmitResult<T>>) => void;
};

const bem = createBEM('pant-form');

export class Form<T = never> extends preact.Component<FormProps<T>> {
  private readonly refs: Record<string, preact.RefObject<Field<any>>> = {};

  private onSubmit(evt: Event): void {
    const { onSubmit } = this.props;
    preventDefault(evt);
    const res = Object.entries(this.refs)
      .map(([name, ref]) => {
        return { name, ref };
      })
      .reduce(
        async (promise, item) => {
          return promise.then(res => {
            const field = item.ref.current;
            return field.doValidate().then(msg => {
              return {
                ok: msg ? false : res.ok,
                message: res.message || msg || '',
                data: { ...res.data, [item.name]: field.getValue() },
              };
            });
          });
        },
        Promise.resolve<SubmitResult>({ ok: true, message: '', data: {} }),
      );
    onSubmit && onSubmit(res);
  }

  render(): preact.JSX.Element {
    const { children, validateTrigger } = this.props;
    const childrenWithProps = [].concat(children).map(child => {
      let ref: preact.RefObject<any> = null;
      const { name, validateTrigger: childValidateTrigger } = child.props;
      if (name) {
        ref = this.refs[name] = this.refs[name] || preact.createRef();
        return preact.cloneElement(child, { ref, validateTrigger: childValidateTrigger || validateTrigger });
      }
      return child;
    });
    return (
      <form class={bem()} onSubmit={this.onSubmit.bind(this)}>
        {childrenWithProps}
      </form>
    );
  }
}
