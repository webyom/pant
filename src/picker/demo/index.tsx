// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import * as preact from 'preact';
import { Picker } from '../../picker';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import { Popup } from '../../popup';
import { Button } from '../../button';
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

  onChange1(value, index): void {
    // console.log(value, 'value');
    // console.log(index, 'index');
  }

  onChange2(values, index, picker): void {
    // console.log(values, 'values');
    // console.log(index, 'index');
    // console.log(picker, 'picker');
  }

  onChange3(values, index, picker): void {
    picker.setColumnValues(1, columns5[values[0]]);
  }

  onConfirm(value, index): void {
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

  getValues(): void {
    // console.log(this.ele.getValues());
    // console.log(values);
  }

  setValues(): void {
    // this.ele.setValues([
    //   {
    //     text: '福建',
    //     children: [
    //       { text: '福州', children: [{ text: '鼓楼区' }, { text: '台江区' }] },
    //       { text: '厦门', children: [{ text: '思明区' }, { text: '海沧区' }] },
    //     ],
    //   },
    //   { text: '厦门', children: [{ text: '思明区' }, { text: '海沧区' }] },
    //   { text: '思明区' },
    // ]);
    this.ele.setValues(['福建', '厦门', '思明区']);
  }

  getIndexes(): void {
    // console.log(this.ele.getIndexes());
  }

  setIndexes(): void {
    this.ele.setIndexes([1, 1, 1]);
  }

  getColumnValue(): void {
    // console.log(this.ele.getColumnValue(2));
  }

  setColumnValue(): void {
    this.ele.setColumnValue(2, '余杭区');
  }

  getColumnIndex(): void {
    // console.log(this.ele.getColumnIndex(0));
  }

  setColumnIndex(): void {
    this.ele.setColumnIndex([1, 1]);
  }

  getColumnValues(): void {
    // console.log(this.ele.getColumnValues(2));
  }

  setColumnValues(): void {
    this.ele.setColumnIndex([1, 1]);
  }

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Picker" type="picker" />
        <div className={bem()}>
          <section>
            <h2>基本用法</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns1}
                onChange={this.onChange1}
              />
            </div>
          </section>

          <section>
            <h2>默认选中项</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                defaultIndex={2}
                columns={columns1}
                onChange={this.onChange1}
              />
            </div>
          </section>

          <section>
            <h2>多列选择</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns2}
                onChange={this.onChange2}
              />
            </div>
          </section>

          <section>
            <h2>级联选择</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns3}
                onChange={this.onChange2}
              />
            </div>
          </section>

          <section>
            <h2>禁用选项</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={columns4}
                onChange={this.onChange1}
              />
            </div>
          </section>

          <section>
            <h2>动态设置选项</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                columns={this.state.dynamicColumns}
                onChange={this.onChange3}
              />
            </div>
          </section>

          <section>
            <h2>加载状态</h2>
            <div className={bem('card')}>
              <Picker
                title="标题"
                cancelButtonText="取消"
                confirmButtonText="确定"
                loading={true}
                columns={this.state.dynamicColumns}
                onChange={this.onChange3}
              />
            </div>
          </section>

          <section>
            <h2>搭配弹出层使用</h2>
            <div className={bem('cityinput')} onClick={this.onClick.bind(this)}>
              <span>城市</span>
              <span>{this.state.cityValue}</span>
            </div>
          </section>

          <Popup show={this.state.showPicker} round position="bottom">
            <Picker
              title="标题"
              cancelButtonText="取消"
              confirmButtonText="确定"
              columns={columns1}
              defaultIndex={this.state.defaultIndex}
              onCancel={this.onCancel.bind(this)}
              onConfirm={this.onConfirm.bind(this)}
            />
          </Popup>

          <section>
            <h2>调用Picker实例方法</h2>
            <div className={bem('button')}>
              <Button type="primary" onClick={this.getValues.bind(this)}>
                getValues
              </Button>
              <Button type="primary" onClick={this.setValues.bind(this)}>
                setValues
              </Button>
            </div>
            <div className={bem('button')}>
              <Button type="primary" onClick={this.getIndexes.bind(this)}>
                getIndexes
              </Button>
              <Button type="primary" onClick={this.setIndexes.bind(this)}>
                setIndexes
              </Button>
            </div>
            <div className={bem('button')}>
              <Button type="primary" onClick={this.getColumnValue.bind(this)}>
                getColumnValue
              </Button>
              <Button type="primary" onClick={this.setColumnValue.bind(this)}>
                setColumnValue
              </Button>
            </div>
            <div className={bem('button')}>
              <Button type="primary" onClick={this.getColumnIndex.bind(this)}>
                getColumnIndex
              </Button>
              <Button type="primary" onClick={this.setColumnIndex.bind(this)}>
                setColumnIndex
              </Button>
            </div>
            <div className={bem('button')}>
              <Button type="primary" onClick={this.getColumnValues.bind(this)}>
                getColumnValues
              </Button>
              <Button type="primary" onClick={this.setColumnValues.bind(this)}>
                setColumnValues
              </Button>
            </div>
            <Picker
              ref={ref => (this.ele = ref)}
              title="标题"
              cancelButtonText="取消"
              confirmButtonText="确定"
              columns={columns3}
              onCancel={this.onCancel.bind(this)}
              onConfirm={this.onConfirm.bind(this)}
            />
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
