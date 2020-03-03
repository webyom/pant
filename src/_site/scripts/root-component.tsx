import * as preact from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import { HomeRouteComponent } from './routes/home';
import { ButtonRouteComponent } from '../../button/demo';
import { NotFoundRouteComponent } from './routes/404';

export class RootComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <Router history={createHashHistory()}>
        <HomeRouteComponent path="/" />
        <ButtonRouteComponent path="/button/" />
        <NotFoundRouteComponent default />
      </Router>
    );
  }
}
