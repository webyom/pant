import * as preact from 'preact';
import clsx from 'clsx';
import { removeUnit } from '../utils';
import { BORDER_UNSET_TOP_BOTTOM } from '../utils/constant';
import { createBEM } from '../utils/bem';
import { preventDefaultAndStopPropagation } from '../utils/event';
import { i18n } from '../locale';
import { DEFAULT_ITEM_HEIGHT } from './constant';
import { PickerColumn } from './picker-column';
import { Loading } from '../loading';
import './index.scss';

export type ToolbarPosition = 'top' | 'bottom';

export type ColumnsItemType = {
  value: string;
  label: string;
};

export type ColumnsType = {
  [key: string]: string | string[] | ColumnsType[];
  value?: string;
  label?: string;
  children?: ColumnsType[];
};

export type PickerProps = {
  /** 可选项数据源 */
  columns?: ColumnsType[] | ColumnsType[][];
  /** 默认的选中项 */
  defaultValue?: string[];
  /** 指定选中项 */
  value?: string[];
  /** 展示标题栏 */
  showToolbar?: boolean;
  /** 标题栏位置 */
  toolbarPosition?: ToolbarPosition;
  /** 标题文本 */
  title?: string;
  /** 取消按钮文本 */
  cancelButtonText?: string;
  /** 确定按钮文本 */
  confirmButtonText?: string;
  /** 行高 */
  itemHeight?: number;
  /** 窗口内可视行数 */
  visibleItemCount?: number;
  /** 自定义value的key值 */
  valueKey?: string;
  /** 自定义label的key值 */
  labelKey?: string;
  /** 滑动惯性滚动速度 */
  swipeDuration?: number;
  /** 加载中展示 */
  loading?: boolean;
  /** 自定义列样式 */
  pickerColumnClassName?: string;
  /** 不可选值 */
  disabledValue?: string[];
  /** 列数 */
  cols?: number;
  /** 是否联动 */
  cascade?: boolean;
  /** 选择取消后的回调 */
  onCancel?: (value: string[] | string) => void;
  /** 选择确定后的回调 */
  onConfirm?: (value: string[] | string) => void;
  closePopup?: (confirm?: boolean) => void;
  /** 点击后回调 */
  onChange?: (value: string[] | string, index: number, thisCom?: preact.AnyComponent) => void;
};

type PickerState = {
  formattedColumns: ColumnsItemType[][];
  children?: PickerColumn[];
  prevColumns?: ColumnsType[] | ColumnsType[][];
  prevValue?: string[];
  pickerValue?: string[];
};

const bem = createBEM('pant-picker');

// 生成formattedColumns
const getFormatted = (
  columns: ColumnsType[] | ColumnsType[][],
  valueKey: string,
  labelKey: string,
  pickerValue: string[],
  cols: number,
  cascade: boolean,
): ColumnsItemType[][] => {
  const formatted: ColumnsItemType[][] = [];
  const realValueKey = valueKey || 'value';
  const realLableKey = labelKey || 'label';
  let filter = [...columns];

  // 多列非联动，columns类型为ColumnsType[][]
  if (cols > 1 && !cascade) {
    for (let i = 0; i < cols; i++) {
      if (filter[i] && filter[i].length) {
        const options: ColumnsItemType[] = [];
        (filter[i] as ColumnsType[]).forEach((item: Record<string, any>) => {
          options.push({
            value: item[realValueKey] as string,
            label: item[realLableKey] as string,
          });
        });
        formatted.push(options);
      } else {
        formatted.push([]);
      }
    }
    return formatted;
  }

  // 单列或多列联动，columns类型为ColumnsType[]
  for (let i = 0; i < cols; i++) {
    if (filter.length) {
      const options: ColumnsItemType[] = [];
      filter.forEach((item: Record<string, any>) => {
        options.push({
          value: item[realValueKey] as string,
          label: item[realLableKey] as string,
        });
      });
      formatted.push(options);

      // 当某一列的pickerValue为空时，默认展示pickerValue为0时的数据
      if (pickerValue[i] === undefined) {
        filter = (filter[0] as ColumnsType).children || [];
      } else {
        // 当存在item.value === pickerValue[i]时，展示该数据下的children；当不存在时，filter=[]
        filter = (filter as ColumnsType[]).filter(item => item.value === pickerValue[i]);
        if (filter.length !== 0) {
          filter = (filter[0] as ColumnsType).children || [];
        }
      }
    } else {
      formatted.push([]);
    }
  }
  return formatted;
};

// 将pickerValue中undefined的项设置为当前列第一个value
const getPickerValue = (columns: ColumnsItemType[][], pickerValue: string[]): string[] => {
  const newPickerValue = [...pickerValue];
  columns.forEach((item: ColumnsItemType[], index: number) => {
    if (item && item.length) {
      newPickerValue[index] = newPickerValue[index] || item[0].value;
    }
  });
  return newPickerValue;
};

export class Picker extends preact.Component<PickerProps, PickerState> {
  private priChildren: PickerColumn[] = [];
  constructor(props: PickerProps) {
    super(props);
    this.state = {
      formattedColumns: [],
      children: [],
      prevColumns: [],
      prevValue: props.value,
      pickerValue: props.value || props.defaultValue || [],
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
    const { valueKey, columns, labelKey, cols, cascade, value } = nextProps;
    const { prevColumns, prevValue, pickerValue } = state;
    if (columns !== prevColumns || value !== prevValue) {
      let realPickerValue = pickerValue;

      if (value !== prevValue) {
        realPickerValue = value;
      }

      const formattedColumns = getFormatted(columns, valueKey, labelKey, realPickerValue, cols, cascade);
      const newPickerValue = getPickerValue(formattedColumns, realPickerValue);
      return {
        ...state,
        pickerValue: newPickerValue,
        formattedColumns: formattedColumns,
        prevColumns: columns,
      };
    } else {
      return null;
    }
  }

  itemPxHeight(): number {
    const { itemHeight } = this.props;
    return itemHeight ? removeUnit(itemHeight) : DEFAULT_ITEM_HEIGHT;
  }

  genToolbar(): preact.JSX.Element {
    const props = this.props;
    if (props.showToolbar) {
      return (
        <div className={bem('toolbar')}>
          {[
            <button type="button" className={bem('cancel')} onClick={this.cancel.bind(this)}>
              {props.cancelButtonText || i18n().cancel}
            </button>,
            <div className={clsx(bem('title'), 'pant-ellipsis')}>{props.title}</div>,
            <button type="button" className={bem('confirm')} onClick={this.confirm.bind(this)}>
              {props.confirmButtonText || i18n().confirm}
            </button>,
          ]}
        </div>
      );
    }
  }

  onCascadeChange(selectedIndex: number, columnIndex: number): void {
    const { formattedColumns, pickerValue } = this.state;
    const { valueKey, columns, cols, labelKey, cascade, onChange } = this.props;

    let newPickerValue: string[] | string = [];

    for (let i = 0; i < cols; i++) {
      if (columnIndex > i) {
        newPickerValue[i] = pickerValue[i];
      } else if (columnIndex === i) {
        newPickerValue[i] = formattedColumns[columnIndex][selectedIndex].value;
      }
    }
    const newFormattedColumns = getFormatted(columns, valueKey, labelKey, newPickerValue, cols, cascade);

    for (let i = columnIndex + 1; i < cols; i++) {
      newPickerValue[i] = newFormattedColumns[i][0] && newFormattedColumns[i][0].value;
    }

    this.setState({
      formattedColumns: newFormattedColumns,
      pickerValue: newPickerValue,
    });

    // 单列时，value返回string
    if (cols === 1) {
      newPickerValue = newPickerValue[0];
    }

    onChange && onChange(newPickerValue, columnIndex);
  }

  onChange(selectedIndex: number, columnIndex: number): void {
    const { cascade, columns, valueKey, labelKey, cols, onChange } = this.props;
    const { formattedColumns, pickerValue } = this.state;

    if (cascade) {
      this.onCascadeChange(selectedIndex, columnIndex);
    } else {
      let newPickerValue: string[] | string = [...pickerValue];
      newPickerValue[columnIndex] = formattedColumns[columnIndex][selectedIndex].value;
      const newFormattedColumns = getFormatted(columns, valueKey, labelKey, newPickerValue, cols, cascade);
      this.setState({
        formattedColumns: newFormattedColumns,
        pickerValue: newPickerValue,
      });

      // 单列时，value返回string
      if (cols === 1) {
        newPickerValue = newPickerValue[0];
      }

      onChange && onChange(newPickerValue, selectedIndex);
    }
  }

  getValue(): string[] | string {
    const { cols } = this.props;
    let newPickerValue: string[] | string = [...this.state.pickerValue];

    // 单列时，value返回string
    if (cols === 1) {
      newPickerValue = newPickerValue[0];
    }

    return newPickerValue;
  }

  confirm(): void {
    this.state.children.forEach((child: PickerColumn) => child.stopMomentum());
    this.emit('onConfirm');
    const { closePopup } = this.props;
    closePopup && closePopup(true);
  }

  cancel(): void {
    this.emit('onCancel');
    const { closePopup } = this.props;
    closePopup && closePopup();
  }

  emit(event: 'onConfirm' | 'onCancel'): void {
    const { cols } = this.props;
    let newPickerValue: string[] | string = [...this.state.pickerValue];

    // 单列时，value返回string
    if (cols === 1) {
      newPickerValue = newPickerValue[0];
    }

    if (this.props[event]) {
      this.props[event](newPickerValue);
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
    const { pickerColumnClassName, swipeDuration, disabledValue, visibleItemCount } = this.props;
    const { pickerValue, formattedColumns } = this.state;
    return formattedColumns.map((item, columnIndex) => (
      <PickerColumn
        value={pickerValue[columnIndex] || (item[0] && item[0].value)}
        disabledValue={disabledValue && disabledValue[columnIndex]}
        className={pickerColumnClassName}
        itemHeight={this.itemPxHeight()}
        swipeDuration={swipeDuration}
        visibleItemCount={visibleItemCount}
        options={item}
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
  valueKey: 'value',
  labelKey: 'label',
  swipeDuration: 1000,
  loading: false,
  cols: 1,
  cascade: false,
};
