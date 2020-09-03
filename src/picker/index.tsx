import * as preact from 'preact';
import clsx from 'clsx';
import { unitToPx } from '../utils';
import { BORDER_UNSET_TOP_BOTTOM } from '../utils/constant';
import { createBEM } from '../utils/bem';
import { preventDefaultAndStopPropagation } from '../utils/event';
import { DEFAULT_ITEM_HEIGHT } from './constant';
import { PickerColumn } from './picker-column';
import { Loading } from '../loading';
import './index.scss';

export type PopupPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export type PopupCloseIconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type ToolbarPosition = 'top' | 'bottom';

export type ColumnsItemType = {
  values?: string[];
  defaultValue?: string;
  className?: string;
  disabledValue?: string;
};

export type ColumnsType = {
  values?: string[] | string;
  children?: ColumnsType[];
};

export type ColumnValueType = {
  ColumnValue?: string[] | string;
  ColumnIndex?: number[] | number;
};

export type PickerProps = {
  showToolbar?: boolean;
  toolbarPosition?: ToolbarPosition;
  cancelButtonText?: string;
  onCancel?<T extends string | string[], K extends number | number[]>(value: T, index: K): void;
  onConfirm?<T extends string | string[], K extends number | number[]>(value: T, index: K): void;
  confirmButtonText?: string;
  title?: string;
  itemHeight?: number;
  visibleItemCount?: number;
  columns?: ColumnsType[] | string[];
  defaultValue?: string | string[];
  onChange?: <T extends string | string[]>(value: T, index: number, thisCom?: preact.AnyComponent) => void;
  valueKey?: string;
  allowHtml?: boolean;
  swipeDuration?: number;
  loading?: boolean;
  pickerColumnClassName?: string;
  disabledValue?: string | string[];
};

type PickerState = {
  formattedColumns: ColumnsItemType[];
  dataType?: string;
  children?: PickerColumn[];
  prevColumns?: ColumnsType[] | string[];
  prevDefaultValue?: string | string[];
  prevPickerColumnClassName?: string;
  prevDisabledValue?: string | string[];
};

const bem = createBEM('pant-picker');

// 判断columns数据类型
const getDataType = (columns: ColumnsType[] | string[]): string => {
  const firstColumn: ColumnsType | string = columns[0] || {};
  let dataTypeString = '';
  if ((firstColumn as ColumnsType).children) {
    dataTypeString = 'cascade';
  } else if ((firstColumn as ColumnsType).values) {
    dataTypeString = 'object';
  } else {
    dataTypeString = 'text';
  }
  return dataTypeString;
};

// 将传入的column转成合适数据类型
const format = (
  dataType: string,
  columns: ColumnsType[] | string[],
  defaultValue: string | string[],
  disabledValue: string | string[],
  pickerColumnClassName: string,
): ColumnsItemType[] => {
  if (dataType === 'text') {
    return [
      {
        values: columns as string[],
        defaultValue: (defaultValue as string) || (columns as string[])[0],
        disabledValue: disabledValue as string,
        className: pickerColumnClassName,
      },
    ];
  } else if (dataType === 'object') {
    const col: ColumnsItemType[] = [];
    (columns as ColumnsItemType[]).forEach((item: ColumnsType, index: number) => {
      col.push({
        values: item.values as string[],
        defaultValue: (defaultValue || [])[index] || item.values[0],
        disabledValue: (disabledValue || [])[index],
        className: pickerColumnClassName,
      });
    });
    return col;
  } else {
    return formatCascade(columns, defaultValue, disabledValue, pickerColumnClassName);
  }
};
// 级联数据类型转换
const formatCascade = (
  columns: ColumnsType[] | string[],
  defaultValue: string | string[],
  disabledValue: string | string[],
  pickerColumnClassName: string,
  newValues?: string[],
): ColumnsItemType[] => {
  const formatted: ColumnsItemType[] = [];
  const realValues: string[] = newValues || (defaultValue as string[]) || [];
  let cursor: ColumnsType = { children: columns as ColumnsType[] };
  let i = 0;
  while (cursor && cursor.children) {
    const valueList: string[] = [];
    let selectedIndex = 0;
    cursor.children.forEach((item, index) => {
      valueList.push(item.values as string);
      if (realValues[i] === undefined) {
        realValues[i] = item.values as string;
      }
      if (item.values === realValues[i]) {
        selectedIndex = index;
      }
    });
    formatted.push({
      values: valueList,
      defaultValue: realValues[i],
      disabledValue: (disabledValue || [])[i],
      className: pickerColumnClassName,
    });
    cursor = cursor.children[selectedIndex];
    i++;
  }
  return formatted;
};
export class Picker extends preact.Component<PickerProps, PickerState> {
  private priChildren: PickerColumn[] = [];
  constructor(props: PickerProps) {
    super(props);
    this.state = {
      formattedColumns: [],
      dataType: '',
      children: [],
      prevColumns: [],
      prevDefaultValue: '',
      prevPickerColumnClassName: '',
      prevDisabledValue: '',
    };
    this.injectChildren = this.injectChildren.bind(this);
  }

  // 将pickerColumn实例注入到state.children
  injectChildren(children: PickerColumn): void {
    this.priChildren.push(children);
    if (this.state.children.length < this.priChildren.length) {
      this.setState({ children: this.priChildren });
    }
  }

  static getDerivedStateFromProps(nextProps: PickerProps, state: PickerState): PickerState {
    const { columns, defaultValue, pickerColumnClassName, disabledValue } = nextProps;
    const { prevColumns, prevDefaultValue, prevPickerColumnClassName, prevDisabledValue } = state;
    if (
      columns !== prevColumns ||
      defaultValue !== prevDefaultValue ||
      pickerColumnClassName !== prevPickerColumnClassName ||
      prevDisabledValue !== prevDisabledValue
    ) {
      const dataType = getDataType(columns);
      const formattedColumns = format(dataType, columns, defaultValue, disabledValue, pickerColumnClassName);
      return {
        ...state,
        dataType,
        formattedColumns: formattedColumns || [],
        prevColumns: columns,
        prevDefaultValue: defaultValue,
        prevPickerColumnClassName: pickerColumnClassName,
        prevDisabledValue: disabledValue,
      };
    } else {
      return null;
    }
  }

  itemPxHeight(): number {
    const { itemHeight } = this.props;
    return itemHeight ? unitToPx(itemHeight) : DEFAULT_ITEM_HEIGHT;
  }

  genToolbar(): preact.JSX.Element {
    const props = this.props;
    if (props.showToolbar) {
      return (
        <div className={bem('toolbar')}>
          {[
            <button type="button" className={bem('cancel')} onClick={this.cancel.bind(this)}>
              {props.cancelButtonText || 'cancel'}
            </button>,
            <div className={clsx(bem('title'), 'van-ellipsis')}>{props.title}</div>,
            <button type="button" className={bem('confirm')} onClick={this.confirm.bind(this)}>
              {props.confirmButtonText || 'confirm'}
            </button>,
          ]}
        </div>
      );
    }
  }

  onCascadeChange(selectedIndex: number, columnIndex: number): void {
    const { formattedColumns } = this.state;
    const { columns, defaultValue, disabledValue, pickerColumnClassName } = this.props;
    const realValues: string[] = [];
    let i = 0;
    for (i; i < columnIndex; i++) {
      realValues[i] = formattedColumns[i].defaultValue;
    }
    realValues[i] = formattedColumns[i].values[selectedIndex];
    this.setState({
      formattedColumns: formatCascade(columns, defaultValue, disabledValue, pickerColumnClassName, realValues),
    });
  }

  onChange(selectedIndex: number, columnIndex: number): void {
    const props = this.props;
    const { dataType, formattedColumns } = this.state;
    if (dataType === 'text') {
      this.setState({
        formattedColumns: [
          {
            ...formattedColumns[0],
            defaultValue: formattedColumns[0].values[selectedIndex],
          },
        ],
      });
      props.onChange && props.onChange(formattedColumns[0].values[selectedIndex], selectedIndex);
    } else if (dataType === 'object') {
      const newF: ColumnsItemType[] = [];
      let selectedValue = '';
      formattedColumns.forEach((item, index) => {
        newF[index] = item;
        if (index === columnIndex) {
          newF[index].defaultValue = item.values[selectedIndex];
          selectedValue = item.values[selectedIndex];
        }
      });
      this.setState(
        {
          formattedColumns: newF,
        },
        () => {
          props.onChange && props.onChange(selectedValue, selectedIndex, this);
        },
      );
    } else {
      this.onCascadeChange(selectedIndex, columnIndex);
    }
  }

  // 获取value和index，用于确定和取消按钮传参
  getColumnValue(): ColumnValueType {
    const { dataType, formattedColumns } = this.state;
    if (dataType === 'text') {
      return {
        ColumnValue: formattedColumns[0].defaultValue,
        ColumnIndex: formattedColumns[0].values.indexOf(formattedColumns[0].defaultValue),
      };
    } else {
      const valuesList: string[] = [];
      const indexList: number[] = [];
      formattedColumns.forEach((item: ColumnsItemType) => {
        valuesList.push(item.defaultValue);
        indexList.push(item.values.indexOf(item.defaultValue));
      });
      return {
        ColumnValue: valuesList,
        ColumnIndex: indexList,
      };
    }
  }

  confirm(): void {
    this.state.children.forEach((child: PickerColumn) => child.stopMomentum());
    this.emit('onConfirm');
  }

  cancel(): void {
    this.emit('onCancel');
  }

  emit(event: 'onConfirm' | 'onCancel'): void {
    const { ColumnValue, ColumnIndex } = this.getColumnValue();
    if (this.props[event]) {
      this.props[event](ColumnValue, ColumnIndex);
    }
  }

  genColumns(): preact.JSX.Element {
    const props = this.props;
    const itemPxHeight = this.itemPxHeight();
    const wrapHeight = itemPxHeight * props.visibleItemCount;

    const frameStyle = { height: `${itemPxHeight}px` };
    const columnsStyle = { height: `${wrapHeight}px` };
    const maskStyle = {
      backgroundSize: `100% ${(wrapHeight - itemPxHeight) / 2}px`,
    };

    return (
      <div className={bem('columns')} style={columnsStyle} onTouchMove={preventDefaultAndStopPropagation}>
        {this.genColumnItems()}
        <div className={bem('mask')} style={maskStyle} />
        <div className={clsx(bem('frame'), BORDER_UNSET_TOP_BOTTOM)} style={frameStyle} />
      </div>
    );
  }

  genColumnItems(): preact.JSX.Element[] {
    const props = this.props;
    return this.state.formattedColumns.map((item, columnIndex) => (
      <PickerColumn
        defaultValue={item.defaultValue}
        disabledValue={item.disabledValue}
        className={item.className}
        itemHeight={this.itemPxHeight()}
        swipeDuration={this.props.swipeDuration}
        visibleItemCount={props.visibleItemCount}
        options={item.values}
        onChange={(selectedIndex: number): void => {
          this.onChange(selectedIndex, columnIndex);
        }}
        injectChildren={this.injectChildren}
      />
    ));
  }

  render(): preact.JSX.Element {
    const props = this.props;
    return (
      <div className={bem()}>
        {props.toolbarPosition === 'top' ? this.genToolbar() : null}
        {props.loading ? <Loading className={bem('loading')} /> : null}
        {this.genColumns()}
        {props.toolbarPosition === 'bottom' ? this.genToolbar() : null}
      </div>
    );
  }
}

Picker.defaultProps = {
  showToolbar: true,
  toolbarPosition: 'top',
  itemHeight: 44,
  visibleItemCount: 6,
  defaultIndex: 0,
  valueKey: 'values',
  swipeDuration: 1000,
  loading: false,
};
