import * as preact from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import { closeAllDialogs } from '../../dialog';
import { clearAllToasts } from '../../toast';
import { HomeRouteComponent } from './routes/home';
import { ActionSheetRouteComponent } from '../../action-sheet/demo';
import { ButtonRouteComponent } from '../../button/demo';
import { CardRouteComponent } from '../../card/demo';
import { CellRouteComponent } from '../../cell/demo';
import { CheckboxRouteComponent } from '../../checkbox/demo';
import { DialogRouteComponent } from '../../dialog/demo';
import { ImgRouteComponent } from '../../img/demo';
import { LayoutRouteComponent } from '../../col/demo';
import { LoadingRouteComponent } from '../../loading/demo';
import { OverlayRouteComponent } from '../../overlay/demo';
import { PopupRouteComponent } from '../../popup/demo';
import { RadioRouteComponent } from '../../radio-group/demo';
import { SkeletonRouteComponent } from '../../skeleton/demo';
import { StylesRouteComponent } from '../../styles/demo';
import { SubmitBarRouteComponent } from '../../submit-bar/demo';
import { TagRouteComponent } from '../../tag/demo';
import { ToastRouteComponent } from '../../toast/demo';
import { NotFoundRouteComponent } from './routes/404';

export class RootComponent extends preact.Component {
  onRouteChange(): void {
    closeAllDialogs();
    clearAllToasts();
  }

  render(): preact.JSX.Element {
    return (
      <Router history={createHashHistory()} onChange={this.onRouteChange}>
        <HomeRouteComponent path="/" />
        <ActionSheetRouteComponent path="/action-sheet/" />
        <ButtonRouteComponent path="/button/" />
        <CardRouteComponent path="/card/" />
        <CellRouteComponent path="/cell/" />
        <CheckboxRouteComponent path="/checkbox/" />
        <DialogRouteComponent path="/dialog/" />
        <ImgRouteComponent path="/img/" />
        <LayoutRouteComponent path="/layout/" />
        <LoadingRouteComponent path="/loading/" />
        <OverlayRouteComponent path="/overlay/" />
        <PopupRouteComponent path="/popup/" />
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
