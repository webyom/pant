import * as preact from 'preact';
import { createBEM } from '../utils/bem';
import './index.scss';

export type RadioProps = {};

const bem = createBEM('pant-radio');

export function Radio(props: RadioProps): preact.JSX.Element {
  return <div className={bem()} {...props}></div>;
}
