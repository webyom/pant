import * as preact from 'preact';
import clsx from 'clsx';
import { Tag } from '../tag';
import { Img } from '../img';
import { isDef } from '../utils';
import { createBEM } from '../utils/bem';
import './index.scss';

export type CardProps = {
  tag?: string;
  num?: number | string;
  desc?: string;
  thumb?: string;
  title?: string;
  price?: number | string;
  currency?: string;
  centered?: boolean;
  lazyLoad?: boolean;
  thumbLink?: string;
  originPrice?: number | string;
  tagNode?: preact.VNode;
  tagsNode?: preact.VNode;
  numNode?: preact.VNode;
  descNode?: preact.VNode;
  thumbNode?: preact.VNode;
  titleNode?: preact.VNode;
  priceTopNode?: preact.VNode;
  priceNode?: preact.VNode;
  originPriceNode?: preact.VNode;
  bottomNode?: preact.VNode;
  footerNode?: preact.VNode;
  onClickThumb?(event: Event): void;
};

const bem = createBEM('pant-card');

export const Card: preact.FunctionalComponent<CardProps> = props => {
  const { thumb } = props;

  const showNum = isDef(props.num);
  const showPrice = isDef(props.price);
  const showOriginPrice = isDef(props.originPrice);
  const showBottom = showNum || showPrice || showOriginPrice || isDef(props.bottomNode);

  function ThumbTag(): preact.JSX.Element {
    if (props.tagNode || props.tag) {
      return (
        <div class={bem('tag')}>
          {props.tagNode ? (
            props.tagNode
          ) : (
            <Tag mark type="danger">
              {props.tag}
            </Tag>
          )}
        </div>
      );
    }
  }

  function Thumb(): preact.JSX.Element {
    if (props.thumbNode || thumb) {
      return (
        <a href={props.thumbLink} class={bem('thumb')} onClick={props.onClickThumb}>
          {props.thumbNode ? (
            props.thumbNode
          ) : (
            <Img src={thumb} width="100%" height="100%" fit="cover" lazyLoad={props.lazyLoad} />
          )}
          {ThumbTag()}
        </a>
      );
    }
  }

  function Title(): preact.JSX.Element {
    if (props.titleNode) {
      return props.titleNode;
    }

    if (props.title) {
      return <div className={clsx(bem('title'), 'van-multi-ellipsis--l2')}>{props.title}</div>;
    }
  }

  function Desc(): preact.JSX.Element {
    if (props.descNode) {
      return props.descNode;
    }

    if (props.desc) {
      return <div className={clsx(bem('desc'), 'van-ellipsis')}>{props.desc}</div>;
    }
  }

  function PriceContent(): preact.JSX.Element {
    const priceArr = props.price!.toString().split('.');
    return (
      <div>
        <span class={bem('price-currency')}>{props.currency}</span>
        <span class={bem('price-integer')}>{priceArr[0]}</span>.<span class={bem('price-decimal')}>{priceArr[1]}</span>
      </div>
    );
  }

  function Price(): preact.JSX.Element {
    if (showPrice) {
      return <div class={bem('price')}>{props.priceNode ? props.priceNode : PriceContent()}</div>;
    }
  }

  function OriginPrice(): preact.JSX.Element {
    if (showOriginPrice) {
      return (
        <div class={bem('origin-price')}>
          {props.originPriceNode ? props.originPriceNode : `${props.currency} ${props.originPrice}`}
        </div>
      );
    }
  }

  function Num(): preact.JSX.Element {
    if (showNum) {
      return <div class={bem('num')}>{props.numNode ? props.numNode : `x${props.num}`}</div>;
    }
  }

  function Footer(): preact.JSX.Element {
    if (props.footerNode) {
      return <div class={bem('footer')}>{props.footerNode}</div>;
    }
  }

  return (
    <div class={bem()}>
      <div class={bem('header')}>
        {Thumb()}
        <div class={bem('content', { centered: props.centered })}>
          <div>
            {Title()}
            {Desc()}
            {props.tagsNode}
          </div>
          {showBottom && (
            <div class="van-card__bottom">
              {props.priceTopNode}
              {Price()}
              {OriginPrice()}
              {Num()}
              {props.bottomNode}
            </div>
          )}
        </div>
      </div>
      {Footer()}
    </div>
  );
};

Card.defaultProps = {
  currency: '¥',
};
