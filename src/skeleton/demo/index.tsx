import * as preact from 'preact';
import { Skeleton } from '../../skeleton';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import logoImg from '../../_site/assets/logo.png';
import './index.scss';

type SkeletonRouteComponentState = {
  show: boolean;
};

const bem = createBEM('demo-skeleton');

export class SkeletonRouteComponent extends preact.Component<any, SkeletonRouteComponentState> {
  state = {
    show: false,
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ show: true });
    }, 2000);
  }

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Skeleton" type="skeleton" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Skeleton row="3" title />
          </section>

          <section>
            <h2>Show Avatar</h2>
            <Skeleton row="3" title avatar />
          </section>

          <section>
            <h2>Show Children</h2>
            <Skeleton row="3" title avatar loading={!this.state.show}>
              <div class="content">
                <img src={logoImg} />
                <div>
                  <h3>About Pant</h3>
                  <p>Vant is a set of Mobile UI Components built on Preact. Ported from Vant.</p>
                </div>
              </div>
            </Skeleton>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
