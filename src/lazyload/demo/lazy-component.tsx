import * as preact from 'preact';

export default function LazyComponent(): preact.JSX.Element {
  return <img className="lazyload" src="https://img.yzcdn.cn/vant/apple-1.jpg" />;
}
