import * as preact from 'preact';
import { createBEM } from '../utils/bem';
import './index.scss';

const bem = createBEM('pant-img');

export function Img(): preact.JSX.Element {
  return <div className={bem()}></div>;
}
