import * as preact from 'preact';
import { Link } from 'preact-router/match';
import { createBEM } from '../../../../utils/bem';
import logoImg from '../../../assets/logo.png';
import githubLogo from '../../../assets/github.svg';
import './index.scss';

const bem = createBEM('demo-home');

function Arrow(): preact.JSX.Element {
  return (
    <svg viewBox="0 0 1024 1024" class="demo-home-nav__icon">
      <path
        fill="#B6C3D2"
        d="M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"
      ></path>
      <path
        fill="#B6C3D2"
        d="M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"
      ></path>
    </svg>
  );
}

export class HomeRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <div className={bem()}>
        <h1>
          <img src={logoImg} />
          <span>Pant</span>
          <a class="github" href="https://github.com/webyom/pant">
            <img src={githubLogo} />
          </a>
        </h1>
        <h2>
          Mobile UI Components built on Preact
          <br />
          Ported from <a href="https://github.com/youzan/vant">Vant</a>
        </h2>

        <section>
          <h3>Basic Components</h3>
          <Link href="/button/">
            Button <Arrow />
          </Link>
          <Link href="/cell/">
            Cell <Arrow />
          </Link>
          <Link href="/img/">
            Image <Arrow />
          </Link>
          <Link href="/layout/">
            Layout <Arrow />
          </Link>
          <Link href="/popup/">
            Popup <Arrow />
          </Link>
          <Link href="/styles/">
            Built-in Styles <Arrow />
          </Link>
        </section>

        <section>
          <h3>Form Components</h3>
          <Link href="/checkbox/">
            Checkbox <Arrow />
          </Link>
          <Link href="/field/">
            Field <Arrow />
          </Link>
          <Link href="/form/">
            Form <Arrow />
          </Link>
          <Link href="/number-keyboard/">
            NumberKeyboard <Arrow />
          </Link>
          <Link href="/password-input/">
            PasswordInput <Arrow />
          </Link>
          <Link href="/picker/">
            Picker <Arrow />
          </Link>
          <Link href="/radio/">
            Radio <Arrow />
          </Link>
          <Link href="/switch/">
            Switch <Arrow />
          </Link>
          <Link href="/number-keyboard/">
            NumberKeyboard <Arrow />
          </Link>
          <Link href="/password-input/">
            PasswordInput <Arrow />
          </Link>
        </section>

        <section>
          <h3>Action Components</h3>
          <Link href="/action-sheet/">
            ActionSheet <Arrow />
          </Link>
          <Link href="/dialog/">
            Dialog <Arrow />
          </Link>
          <Link href="/loading/">
            Loading <Arrow />
          </Link>
          <Link href="/notify/">
            Notify <Arrow />
          </Link>
          <Link href="/overlay/">
            Overlay <Arrow />
          </Link>
          <Link href="/pull-refresh/">
            PullRefresh <Arrow />
          </Link>
          <Link href="/toast/">
            Toast <Arrow />
          </Link>
        </section>

        <section>
          <h3>Display Components</h3>
          <Link href="/lazyload/">
            Lazyload <Arrow />
          </Link>
          <Link href="/list/">
            List <Arrow />
          </Link>
          <Link href="/skeleton/">
            Skeleton <Arrow />
          </Link>
          <Link href="/sticky/">
            Sticky <Arrow />
          </Link>
          <Link href="/tag/">
            Tag <Arrow />
          </Link>
        </section>

        <section>
          <h3>Navigation Components</h3>
          <Link href="/tab/">
            Tab <Arrow />
          </Link>
        </section>

        <section>
          <h3>Business Components</h3>
          <Link href="/card/">
            Card <Arrow />
          </Link>
          <Link href="/submit-bar/">
            SubmitBar <Arrow />
          </Link>
        </section>
      </div>
    );
  }
}
