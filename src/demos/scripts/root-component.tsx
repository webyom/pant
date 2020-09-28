import * as preact from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import { closeAllactionSheets } from '../../action-sheet';
import { closeAllDialogs } from '../../dialog';
import { clearAllNotifies } from '../../notify';
import { clearAllToasts } from '../../toast';
import { HomeRouteComponent } from './routes/home';
import { ActionSheetRouteComponent } from '../../action-sheet/demo';
import { ButtonRouteComponent } from '../../button/demo';
import { CardRouteComponent } from '../../card/demo';
import { CellRouteComponent } from '../../cell/demo';
import { CheckboxRouteComponent } from '../../checkbox/demo';
import { DialogRouteComponent } from '../../dialog/demo';
import { FieldRouteComponent } from '../../field/demo';
import { FormRouteComponent } from '../../form/demo';
import { ImgRouteComponent } from '../../img/demo';
import { LayoutRouteComponent } from '../../col/demo';
import { LazyloadRouteComponent } from '../../lazyload/demo';
import { ListRouteComponent } from '../../list/demo';
import { LoadingRouteComponent } from '../../loading/demo';
import { NotifyRouteComponent } from '../../notify/demo';
import { NumberKeyboardRouteComponent } from '../../number-keyboard/demo';
import { OverlayRouteComponent } from '../../overlay/demo';
import { PasswordInputRouteComponent } from '../../password-input/demo';
import { PickerRouteComponent } from '../../picker/demo';
import { PopupRouteComponent } from '../../popup/demo';
import { PullRefreshRouteComponent } from '../../pull-refresh/demo';
import { RadioRouteComponent } from '../../radio-group/demo';
import { SkeletonRouteComponent } from '../../skeleton/demo';
import { StickyRouteComponent } from '../../sticky/demo';
import { StylesRouteComponent } from '../../styles/demo';
import { SubmitBarRouteComponent } from '../../submit-bar/demo';
import { SwitchRouteComponent } from '../../switch/demo';
import { TabRouteComponent } from '../../tab/demo';
import { TagRouteComponent } from '../../tag/demo';
import { ToastRouteComponent } from '../../toast/demo';
import { NotFoundRouteComponent } from './routes/404';

export class RootComponent extends preact.Component {
  componentDidMount(): void {
    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount(): void {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  private onHashChange(): void {
    const parentRoute = (parent as any).$componentRoute;
    if (parentRoute) {
      parentRoute(location.hash);
    }
  }

  private onRouteChange(): void {
    closeAllactionSheets();
    closeAllDialogs();
    clearAllNotifies();
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
        <FieldRouteComponent path="/field/" />
        <FormRouteComponent path="/form/" />
        <ImgRouteComponent path="/img/" />
        <LayoutRouteComponent path="/layout/" />
        <LazyloadRouteComponent path="/lazyload/" />
        <ListRouteComponent path="/list/" />
        <LoadingRouteComponent path="/loading/" />
        <NotifyRouteComponent path="/notify/" />
        <NumberKeyboardRouteComponent path="/number-keyboard" />
        <OverlayRouteComponent path="/overlay/" />
        <PasswordInputRouteComponent path="/password-input/" />
        <PickerRouteComponent path="/picker/" />
        <PopupRouteComponent path="/popup/" />
        <PullRefreshRouteComponent path="/pull-refresh/" />
        <RadioRouteComponent path="/radio/" />
        <SkeletonRouteComponent path="/skeleton/" />
        <StickyRouteComponent path="/sticky/" />
        <StylesRouteComponent path="/styles/" />
        <SubmitBarRouteComponent path="/submit-bar/" />
        <SwitchRouteComponent path="/switch/" />
        <TabRouteComponent path="/tab/" />
        <TagRouteComponent path="/tag/" />
        <ToastRouteComponent path="/toast/" />
        <NotFoundRouteComponent default />
      </Router>
    );
  }
}
