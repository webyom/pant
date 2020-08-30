import * as preact from 'preact';
import './index.scss';

export { Tabs } from './tabs';

export type TabProps = {
  title: string | preact.VNode;
  name?: string;
  disabled?: boolean;
};

export const Tab: preact.FunctionalComponent<TabProps> = () => {
  return null;
};
