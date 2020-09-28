import * as preact from 'preact';
import { Suspense, lazy } from 'preact/compat';
import { Img } from '../../img';
import { Loading } from '../../loading';
import { Lazyload } from '../../lazyload';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const LazyComponent = lazy(() => import('./lazy-component'));

const bem = createBEM('demo-lazyload');

export class LazyloadRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Lazyload" type="lazyload" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Lazyload className="lazyload">
              <img className="lazyload" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </Lazyload>
            <Lazyload className="lazyload">
              <img className="lazyload" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
            </Lazyload>
            <Lazyload className="lazyload">
              <img className="lazyload" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
            </Lazyload>
            <Lazyload className="lazyload">
              <img className="lazyload" src="https://img.yzcdn.cn/vant/apple-4.jpg" />
            </Lazyload>
          </section>

          <section>
            <h2>Lazyload Background Image</h2>
            <Lazyload className="lazyload">
              <div
                className="lazyload"
                style="background-image: url(https://img.yzcdn.cn/vant/apple-5.jpg); background-size: 100% 100%;"
              ></div>
              <div
                className="lazyload"
                style="background-image: url(https://img.yzcdn.cn/vant/apple-6.jpg); background-size: 100% 100%;"
              ></div>
            </Lazyload>
          </section>

          <section>
            <h2>Lazyload Component</h2>
            <Lazyload className="lazyload">
              <Img
                className="lazyload"
                width="100%"
                height="250"
                radius="16"
                src="https://img.yzcdn.cn/vant/apple-7.jpg"
              />
            </Lazyload>
            <Lazyload className="lazyload">
              <Img
                className="lazyload"
                width="100%"
                height="250"
                radius="16"
                src="https://img.yzcdn.cn/vant/apple-8.jpg"
              />
            </Lazyload>
          </section>

          <section>
            <h2>Suspense</h2>
            <Lazyload className="lazyload">
              <Suspense
                fallback={
                  <div className="lazyload" style="text-align: center; padding-top: 100px;">
                    <Loading />
                  </div>
                }
              >
                <LazyComponent />
              </Suspense>
            </Lazyload>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
