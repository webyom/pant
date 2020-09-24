import * as preact from 'preact';
import { Picker } from '../../picker';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import { Popup } from '../../popup';
import { toast } from '../../toast';
import { columns1, columns2, columns3, columns4, columns5 } from './constant';
import './index.scss';

const bem = createBEM('demo-picker');

type PickerState = {
  dynamicColumns: any[];
  cityValue: string;
  showPicker: boolean;
  pickerValue: string[];
  loading: boolean;
};

export type ColumnsType = {
  [key: string]: string | string[] | ColumnsType[];
  value?: string;
  label?: string;
  children?: ColumnsType[];
};
export class PickerRouteComponent extends preact.Component<any, PickerState> {
  private ele: any;
  state: PickerState = {
    dynamicColumns: columns4,
    cityValue: '',
    showPicker: false,
    pickerValue: [],
    loading: false,
  };

  onClick(): void {
    this.setState({
      showPicker: true,
    });
  }

  onChange1<T extends string | string[]>(value: T, index: number): void {
    toast({
      message: `Value: ${value}, Index：${index}`,
    });
  }

  onConfirm1(value: string[]): void {
    toast({
      message: `Value: ${value}`,
    });
  }

  onConfirm2(value: string[]): void {
    this.setState({
      cityValue: value[0],
      showPicker: false,
      pickerValue: value,
    });
  }

  onCancel(): void {
    this.setState({
      showPicker: false,
    });
  }

  onChangeColumns(value: string[], index: number): void {
    const { dynamicColumns } = this.state;
    if (index === 0) {
      dynamicColumns.forEach(item => {
        if (item.value === value[0] && !item.children) {
          this.setState({
            loading: true,
          });
          item.children = columns5[value[0]];
          item.children[0].children = columns5[item.children[0].value];
        }
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          dynamicColumns: [...dynamicColumns],
        });
      }, 500);
    } else if (index === 1) {
      dynamicColumns.forEach(item => {
        if (item.value === value[0] && item.children) {
          item.children.forEach((subItem: any) => {
            if (subItem.value === value[1] && !subItem.children) {
              this.setState({
                loading: true,
              });
              subItem.children = columns5[value[1]];
            }
          });
        }
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          dynamicColumns: [...dynamicColumns],
        });
      }, 500);
    }
  }

  onChangeColumns3(): void {
    this.setState({
      dynamicColumns: columns3,
    });
  }

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Picker" type="picker" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <div className={bem('card')}>
              <Picker title="Title" columns={columns1} onChange={this.onChange1} />
            </div>
          </section>

          <section>
            <h2>Default Index</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                defaultValue={['绍兴']}
                value={['湖州']}
                columns={columns1}
                onChange={this.onChange1}
              />
            </div>
          </section>

          <section>
            <h2>Multiple Columns</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns2}
                onConfirm={this.onConfirm1}
                disabledValue={['周二', '下午']}
                cols={2}
              />
            </div>
          </section>

          <section>
            <h2>Cascade</h2>
            <div className={bem('card')}>
              <Picker title="Title" columns={columns3} onConfirm={this.onConfirm1} cols={3} cascade={true} />
            </div>
          </section>

          <section>
            <h2>Disable Option</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns1}
                disabledValue={['温州']}
                onConfirm={this.onConfirm1}
              />
            </div>
          </section>

          <section>
            <h2>Set Column Values</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={this.state.dynamicColumns}
                cols={3}
                cascade={true}
                loading={this.state.loading}
                onChange={this.onChangeColumns.bind(this)}
                onConfirm={this.onConfirm1}
              />
            </div>
          </section>

          <section>
            <h2>Loading</h2>
            <div className={bem('card')}>
              <Picker title="Title" loading={true} columns={columns1} />
            </div>
          </section>

          <section>
            <h2>With Popup</h2>
            <div className={bem('cityinput')} onClick={this.onClick.bind(this)}>
              <span>城市</span>
              <span>{this.state.cityValue}</span>
            </div>
          </section>

          <Popup show={this.state.showPicker} round position="bottom">
            <Picker
              title="Title"
              columns={columns1}
              onCancel={this.onCancel.bind(this)}
              onConfirm={this.onConfirm2.bind(this)}
            />
          </Popup>
        </div>
      </preact.Fragment>
    );
  }
}
