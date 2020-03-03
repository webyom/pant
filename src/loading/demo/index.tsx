import * as preact from 'preact';
import { Loading } from '../../loading';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-loading');

export class LoadingRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Loading" type="loading" />
        <div className={bem()}>
          <section>
            <h2>Type</h2>
            <Loading></Loading>
            <Loading type="spinner"></Loading>
          </section>

          <section>
            <h2>Color</h2>
            <Loading color="rgba(25, 137, 250, 1)"></Loading>
            <Loading color="#1989fa" type="spinner"></Loading>
          </section>

          <section>
            <h2>Size</h2>
            <Loading size="40"></Loading>
            <Loading size="40" type="spinner"></Loading>
          </section>

          <section>
            <h2>Text</h2>
            <Loading>Loading...</Loading>
            <Loading type="spinner">Loading...</Loading>
          </section>

          <section>
            <h2>Text Size</h2>
            <Loading textSize="20">Loading...</Loading>
            <Loading textSize="20" type="spinner">
              Loading...
            </Loading>
          </section>

          <section>
            <h2>Vertical</h2>
            <Loading vertical>Loading...</Loading>
            <Loading type="spinner" vertical>
              Loading...
            </Loading>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
