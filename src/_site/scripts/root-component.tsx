import * as preact from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import { clearAllToasts } from '../../toast';
import { HomeRouteComponent } from './routes/home';
import { ButtonRouteComponent } from '../../button/demo';
import { CardRouteComponent } from '../../card/demo';
import { CellRouteComponent } from '../../cell/demo';
import { CheckboxRouteComponent } from '../../checkbox/demo';
import { ImgRouteComponent } from '../../img/demo';
import { LayoutRouteComponent } from '../../col/demo';
import { LoadingRouteComponent } from '../../loading/demo';
import { OverlayRouteComponent } from '../../overlay/demo';
import { RadioRouteComponent } from '../../radio-group/demo';
import { SkeletonRouteComponent } from '../../skeleton/demo';
import { StylesRouteComponent } from '../../styles/demo';
import { SubmitBarRouteComponent } from '../../submit-bar/demo';
import { TagRouteComponent } from '../../tag/demo';
import { ToastRouteComponent } from '../../toast/demo';
import { NotFoundRouteComponent } from './routes/404';

export class RootComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <Router history={createHashHistory()} onChange={clearAllToasts}>
        <HomeRouteComponent path="/" />
        <ButtonRouteComponent path="/button/" />
        <CardRouteComponent path="/card/" />
        <CellRouteComponent path="/cell/" />
        <CheckboxRouteComponent path="/checkbox/" />
        <ImgRouteComponent path="/img/" />
        <LayoutRouteComponent path="/layout/" />
        <LoadingRouteComponent path="/loading/" />
        <OverlayRouteComponent path="/overlay/" />
        <RadioRouteComponent path="/radio/" />
        <SkeletonRouteComponent path="/skeleton/" />
        <StylesRouteComponent path="/styles/" />
        <SubmitBarRouteComponent path="/submit-bar/" />
        <TagRouteComponent path="/tag/" />
        <ToastRouteComponent path="/toast/" />
        <NotFoundRouteComponent default />
      </Router>
    );
  }
}
