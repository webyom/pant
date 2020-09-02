import * as preact from 'preact';
import clsx from 'clsx';
import { isDef, removeUnit } from '../utils';
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

export type CascadeColumns = {
  children?: any;
  defaultIndex?: number;
  className?: string;
};

export type PickerProps = {
  showToolbar?: boolean;
  toolbarPosition?: ToolbarPosition;
  cancelButtonText?: string;
  onCancel?<T extends string | any[], K extends number | number[]>(value: T, index: K): void;
  onConfirm?<T extends string | any[], K extends number | number[]>(value: T, index: K): void;
  confirmButtonText?: string;
  title?: string;
  itemHeight?: number;
  visibleItemCount?: number;
  columns?: any;
  defaultIndex?: number;
  onChange?: <T extends string | any[]>(value: T, index: number, thisCom?: preact.AnyComponent) => void;
  valueKey?: string;
  allowHtml?: boolean;
  swipeDuration?: number;
  loading?: boolean;
};

type PickerState = {
  formattedColumns: any[];
  dataType?: string;
  children?: any;
};

const bem = createBEM('pant-picker');

export class Picker extends preact.Component<PickerProps, PickerState> {
  private priChildren: any[] = [];
  constructor(props: PickerProps) {
    super(props);
    this.state = {
      formattedColumns: [],
      dataType: '',
      children: [],
    };
    this.injectChildren = this.injectChildren.bind(this);
    this.getValues = this.getValues.bind(this);
    this.setValues = this.setValues.bind(this);
    this.getIndexes = this.getIndexes.bind(this);
    this.setIndexes = this.setIndexes.bind(this);
    this.getColumnValue = this.getColumnValue.bind(this);
    this.setColumnValue = this.setColumnValue.bind(this);
    this.getColumnIndex = this.getColumnIndex.bind(this);
    this.setColumnIndex = this.setColumnIndex.bind(this);
    this.getColumnValues = this.getColumnValues.bind(this);
    this.setColumnValues = this.setColumnValues.bind(this);
  }

  // 将pickerColumn实例注入到state.children
  injectChildren(children: preact.AnyComponent): void {
    this.priChildren.push(children);
    if (this.state.children.length < this.priChildren.length) {
      this.setState({ children: this.priChildren });
    }
  }

  componentDidMount(): void {
    this.getDataType();
  }

  // 判断columns数据类型
  getDataType(): void {
    const { columns } = this.props;
    const firstColumn = columns[0] || {};
    let dataTypeString = '';
    if (firstColumn.children) {
      dataTypeString = 'cascade';
    } else if (firstColumn.values) {
      dataTypeString = 'object';
    } else {
      dataTypeString = 'text';
    }
    this.setState(
      {
        dataType: dataTypeString,
      },
      this.format,
    );
  }

  // 将传入的column转成合适数据类型
  format(): void {
    const { columns } = this.props;
    const { dataType } = this.state;
    if (dataType === 'text') {
      this.setState({
        formattedColumns: [{ values: columns }],
      });
    } else if (dataType === 'cascade') {
      this.formatCascade();
    } else {
      this.setState({
        formattedColumns: columns,
      });
    }
  }

  // 级联数据类型转换
  formatCascade(): void {
    const { columns } = this.props;
    const formatted = [];

    let cursor: CascadeColumns = { children: columns };

    while (cursor && cursor.children) {
      let defaultIndex: number;
      if (isDef(cursor.defaultIndex)) {
        defaultIndex = cursor.defaultIndex;
      } else {
        defaultIndex = +this.props.defaultIndex;
      }
      formatted.push({
        values: cursor.children,
        className: cursor.className,
        defaultIndex,
      });

      cursor = cursor.children[defaultIndex];
    }
    this.setState({
      formattedColumns: formatted,
    });
  }

  /*
    @exposed-api
   */
  // get values of all columns
  getValues(): any[] {
    return this.state.children.map((child: any) => child.getValue());
  }

  // set values of all columns
  setValues(values: any[]): void {
    values.forEach((value, index) => {
      this.setColumnValue(index, value);
    });
  }

  // get indexes of all columns
  getIndexes(): number[] {
    return this.state.children.map((child: any) => child.state.currentIndex);
  }

  // set indexes of all columns
  setIndexes(indexes: number[]): void {
    indexes.forEach((optionIndex, columnIndex) => {
      this.setColumnIndex(columnIndex, optionIndex);
    });
  }

  // get column value by index
  getColumnValue(index: number): any {
    const column = this.getColumn(index);
    return column && column.getValue();
  }

  // set column value by index
  setColumnValue(index: number, value: Record<string, any> | string): void {
    const column = this.getColumn(index);
    if (column) {
      column.setValue(value);
      if (this.state.dataType === 'cascade') {
        this.onCascadeChange(index);
      }
    }
  }

  // get column option index by column index
  getColumnIndex(columnIndex: number): number {
    return (this.getColumn(columnIndex) || {}).state.currentIndex;
  }

  // set column option index by column index
  setColumnIndex(columnIndex: number, optionIndex: number): void {
    const column = this.getColumn(columnIndex);

    if (column) {
      column.setIndex(optionIndex);

      if (this.state.dataType === 'cascade') {
        this.onCascadeChange(columnIndex);
      }
    }
  }

  // get options of column by index
  getColumnValues(index: number): any {
    return (this.state.children[index] || {}).state.options;
  }

  // set options of column by index
  setColumnValues(index: number, options: any[]): void {
    const column = this.state.children[index];
    if (column) {
      column.setOptions(options);
    }
  }

  // get column instance by index
  getColumn(index: number): any {
    return this.state.children[index];
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
              {props.cancelButtonText || 'Cancel'}
            </button>,
            <div className={clsx(bem('title'), 'van-ellipsis')}>{props.title}</div>,
            <button type="button" className={bem('confirm')} onClick={this.confirm.bind(this)}>
              {props.confirmButtonText || 'Confirm'}
            </button>,
          ]}
        </div>
      );
    }
  }

  onCascadeChange(columnIndex: number): void {
    const { columns } = this.props;
    let cursor: CascadeColumns = { children: columns };
    const indexes = this.getIndexes();
    for (let i = 0; i <= columnIndex; i++) {
      cursor = cursor.children[indexes[i]];
    }

    while (cursor && cursor.children) {
      columnIndex++;
      this.setColumnValues(columnIndex, cursor.children);
      cursor = cursor.children[cursor.defaultIndex || 0];
    }
  }

  onChange(columnIndex: number): void {
    const props = this.props;
    const { dataType } = this.state;
    if (dataType === 'text') {
      props.onChange && props.onChange(this.getColumnValue(0), this.getColumnIndex(0));
    } else if (dataType === 'object') {
      const values = this.getValues();
      props.onChange && props.onChange(values, columnIndex, this);
    } else {
      this.onCascadeChange(columnIndex);
      setTimeout(() => {
        let values = this.getValues();
        values = values.map(item => item[props.valueKey]);
        props.onChange && props.onChange(values, columnIndex, this);
      }, 0);
    }
  }

  genColumnItems(): preact.JSX.Element[] {
    const props = this.props;
    return this.state.formattedColumns.map((item, columnIndex) => (
      <PickerColumn
        valueKey={props.valueKey}
        allowHtml={props.allowHtml}
        className={item.className}
        itemHeight={this.itemPxHeight()}
        defaultIndex={isDef(item.defaultIndex) ? item.defaultIndex : props.defaultIndex}
        swipeDuration={this.props.swipeDuration}
        visibleItemCount={props.visibleItemCount}
        initialOptions={item.values}
        onChange={(): void => {
          this.onChange(columnIndex);
        }}
        injectChildren={this.injectChildren}
      />
    ));
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

  confirm(): void {
    this.state.children.forEach((child: PickerColumn) => child.stopMomentum());
    this.emit('onConfirm');
  }

  cancel(): void {
    this.emit('onCancel');
  }

  emit(event: 'onConfirm' | 'onCancel'): void {
    if (this.state.dataType === 'text') {
      if (this.props[event]) {
        this.props[event](this.getColumnValue(0), this.getColumnIndex(0));
      }
    } else {
      let values = this.getValues();

      // compatible with old version of wrong parameters
      // should be removed in next major version
      // see: https://github.com/youzan/vant/issues/5905
      if (this.state.dataType === 'cascade') {
        values = values.map(item => item[this.props.valueKey]);
      }

      if (this.props[event]) {
        this.props[event](values, this.getIndexes());
      }
    }
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
  valueKey: 'text',
  allowHtml: true,
  swipeDuration: 1000,
  loading: false,
};
