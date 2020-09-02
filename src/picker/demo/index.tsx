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
  defaultIndex: number;
};

export class PickerRouteComponent extends preact.Component<any, PickerState> {
  private ele: any;
  state: PickerState = {
    dynamicColumns: [{ values: Object.keys(columns5) }, { values: columns5['浙江'] }],
    cityValue: '',
    showPicker: false,
    defaultIndex: 0,
  };

  onClick(): void {
    this.setState({
      showPicker: true,
    });
  }

  onChange1<T extends string | any[]>(value: T, index: number): void {
    toast({
      message: `Value: ${value}, Index：${index}`,
    });
  }

  onChange2<T extends string | any[]>(values: T, index: number, picker: any): void {
    picker.setColumnValues(1, columns5[values[0]]);
  }

  onConfirm1<T extends string | any[], K extends number | number[]>(value: T, index: K): void {
    toast({
      message: `Value: ${value}, Index：${index}`,
    });
  }

  onConfirm2(value: string, index: number): void {
    this.setState({
      cityValue: value,
      showPicker: false,
      defaultIndex: index,
    });
  }

  onCancel(): void {
    this.setState({
      showPicker: false,
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
              <Picker title="Title" defaultIndex={2} columns={columns1} onChange={this.onChange1} />
            </div>
          </section>

          <section>
            <h2>Multiple Columns</h2>
            <div className={bem('card')}>
              <Picker title="Title" columns={columns2} onConfirm={this.onConfirm1} />
            </div>
          </section>

          <section>
            <h2>Cascade</h2>
            <div className={bem('card')}>
              <Picker title="Title" columns={columns3} onConfirm={this.onConfirm1} />
            </div>
          </section>

          <section>
            <h2>Disable Option</h2>
            <div className={bem('card')}>
              <Picker title="Title" cancelButtonText="取消" confirmButtonText="确定" columns={columns4} />
            </div>
          </section>

          <section>
            <h2>Set Column Values</h2>
            <div className={bem('card')}>
              <Picker title="Title" columns={this.state.dynamicColumns} onChange={this.onChange2} />
            </div>
          </section>

          <section>
            <h2>Loading</h2>
            <div className={bem('card')}>
              <Picker title="Title" loading={true} columns={this.state.dynamicColumns} />
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
              defaultIndex={this.state.defaultIndex}
              onCancel={this.onCancel.bind(this)}
              onConfirm={this.onConfirm2.bind(this)}
            />
          </Popup>
        </div>
      </preact.Fragment>
    );
  }
}
