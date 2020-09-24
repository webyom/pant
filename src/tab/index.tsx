import * as preact from 'preact';
import './index.scss';

export { Tabs, TabInfo } from './tabs';

export type TabProps = {
  title: string;
  titleNode?: preact.VNode;
  name?: string;
  dot?: boolean;
  info?: number | string;
  disabled?: boolean;
  lazyRender?: boolean;
  isActive?: boolean;
};

export class Tab extends preact.Component<TabProps> {
  private inited = false;

  render(): preact.JSX.Element {
    const { isActive, lazyRender, children } = this.props;
    const shouldRender = (this.inited = this.inited || isActive || !lazyRender);
    return <preact.Fragment>{shouldRender ? children : null}</preact.Fragment>;
  }
}
