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
};

export const Tab: preact.FunctionalComponent<TabProps> = () => {
  return null;
};
