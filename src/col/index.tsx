import * as preact from 'preact';
import { createBEM } from '../utils/bem';
import './index.scss';

export type ColProps = {
  span?: number | string;
  offset?: number | string;
  gutter?: number | string;
  children?: preact.ComponentChildren;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-col');

export function Col(props: ColProps): preact.JSX.Element {
  const { span, offset } = props;
  const gutter = Number(props.gutter) || 0;
  const padding = `${gutter / 2}px`;
  const style = gutter ? { paddingLeft: padding, paddingRight: padding } : {};

  return (
    <div style={style} class={bem({ [span]: span, [`offset-${offset}`]: offset })} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

Col.defaultProps = {
  gutter: 0,
};
