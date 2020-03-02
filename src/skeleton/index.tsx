import * as preact from 'preact';
import { addUnit } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type SkeletonProps = {
  row?: number | string;
  title?: boolean;
  avatar?: boolean;
  loading?: boolean;
  animate?: boolean;
  avatarSize?: string;
  avatarShape?: 'square' | 'round';
  titleWidth?: number | string;
  rowWidth?: number | string | (number | string)[];
  children?: preact.VNode;
};

const DEFAULT_ROW_WIDTH = '100%';
const DEFAULT_LAST_ROW_WIDTH = '60%';

const bem = createBEM('pant-skeleton');

export function Skeleton(props: SkeletonProps): preact.JSX.Element {
  if (!props.loading) {
    return props.children;
  }

  function Title(): preact.JSX.Element {
    if (props.title) {
      return <h3 class={bem('title')} style={{ width: addUnit(props.titleWidth) }} />;
    }
  }

  function Rows(): preact.JSX.Element[] {
    const Rows = [];
    const { rowWidth } = props;

    function getRowWidth(index: number): number | string {
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    }

    for (let i = 0; i < props.row; i++) {
      Rows.push(<div class={bem('row')} style={{ width: addUnit(getRowWidth(i)) }} />);
    }

    return Rows;
  }

  function Avatar(): preact.JSX.Element {
    if (props.avatar) {
      const size = addUnit(props.avatarSize);
      return <div class={bem('avatar', props.avatarShape)} style={{ width: size, height: size }} />;
    }
  }

  return (
    <div class={bem({ animate: props.animate })}>
      {Avatar()}
      <div class={bem('content')}>
        {Title()}
        {Rows()}
      </div>
    </div>
  );
}

Skeleton.defaultProps = {
  row: 0,
  loading: true,
  animate: true,
  avatarSize: '32px',
  avatarShape: 'round',
  titleWidth: '40%',
  rowWidth: DEFAULT_ROW_WIDTH,
};
