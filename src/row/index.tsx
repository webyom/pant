import * as preact from 'preact';
import { createBEM } from '../utils/bem';
import './index.scss';

export type RowProps = {
  type?: 'flex';
  align?: string;
  justify?: string;
  gutter?: number | string;
  onClick?(event: Event): void;
};

const bem = createBEM('pant-row');

export const Row: preact.FunctionalComponent<RowProps> = props => {
  const { align, justify } = props;
  const flex = props.type === 'flex';
  const margin = `-${Number(props.gutter) / 2}px`;
  const style = props.gutter ? { marginLeft: margin, marginRight: margin } : {};
  const childrenWithProps = []
    .concat(props.children)
    .map(child => preact.cloneElement(child, { gutter: props.gutter }));

  return (
    <div
      style={style}
      class={bem({
        flex,
        [`align-${align}`]: flex && align,
        [`justify-${justify}`]: flex && justify,
      })}
      onClick={props.onClick}
    >
      {childrenWithProps}
    </div>
  );
};

Row.defaultProps = {
  gutter: 0,
};
