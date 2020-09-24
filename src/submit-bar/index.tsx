import * as preact from 'preact';
import { Icon } from '../icon';
import { Button, ButtonType } from '../button';
import { i18n } from '../locale';
import { createBEM } from '../utils/bem';
import './index.scss';

export type SubmitBarProps = {
  tip?: string;
  tipIcon?: string;
  label?: string;
  price?: number;
  loading?: boolean;
  currency?: string;
  disabled?: boolean;
  buttonType?: ButtonType;
  buttonText?: string;
  suffixLabel?: string;
  decimalLength?: number;
  safeAreaInsetBottom?: boolean;
  textAlign?: 'right' | 'left';
  tipNode?: preact.VNode;
  topNode?: preact.VNode;
  children?: preact.ComponentChildren;
  onSubmit?(): void;
};

const bem = createBEM('pant-submit-bar');

export const SubmitBar: preact.FunctionalComponent<SubmitBarProps> = props => {
  const { tip, price, tipIcon } = props;

  function Text(): preact.JSX.Element {
    if (typeof price === 'number') {
      const priceArr = (price / 100).toFixed(props.decimalLength).split('.');
      const decimalStr = props.decimalLength ? `.${priceArr[1]}` : '';
      return (
        <div style={{ textAlign: props.textAlign ? props.textAlign : '' }} class={bem('text')}>
          <span>{props.label}</span>
          <span class={bem('price')}>
            {props.currency}
            <span class={bem('price', 'integer')}>{priceArr[0]}</span>
            {decimalStr}
          </span>
          {props.suffixLabel && <span class={bem('suffix-label')}>{props.suffixLabel}</span>}
        </div>
      );
    }
  }

  function Tip(): preact.JSX.Element {
    if (props.tip || props.tipNode) {
      return (
        <div class={bem('tip')}>
          {tipIcon && <Icon className={bem('tip-icon')} name={tipIcon} />}
          {tip && <span class={bem('tip-text')}>{tip}</span>}
          {props.tipNode}
        </div>
      );
    }
  }

  return (
    <div class={bem({ 'safe-area-inset-bottom': props.safeAreaInsetBottom })}>
      {props.topNode}
      {Tip()}
      <div class={bem('bar')}>
        {props.children}
        {Text()}
        <Button
          round
          className={bem('button', props.buttonType)}
          type={props.buttonType}
          loading={props.loading}
          disabled={props.disabled}
          text={props.loading ? '' : props.buttonText || i18n().submit}
          onClick={props.onSubmit}
        />
      </div>
    </div>
  );
};

SubmitBar.defaultProps = {
  decimalLength: 2,
  currency: '¥',
  buttonType: 'danger',
};
