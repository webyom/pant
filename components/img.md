# Image

### Import

```js
import { Img } from 'pant/es/img';
```

## Usage

### Basic Usage

```jsx
<Img width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

### Fit Mode

```jsx
<Img
  width="10rem"
  height="10rem"
  fit="contain"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### Round

Show round image, it may not works at `fit=contain` and `fit=scale-down`

```jsx
<Img
  round
  width="10rem"
  height="10rem"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### Lazy Load

```jsx
<Img
  width="100"
  height="100"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
  lazyLoad
/>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| src | Src | _string_ | - |
| fit | Fit mode | _string_ | `fill` |
| alt | Alt | _string_ | - |
| width | Width | _number \| string_ | - |
| height | Height | _number \| string_ | - |
| radius | Border Radius | _number \| string_ | `0` |
| className | className | _string_ | - |
| round | Whether to be round | _boolean_ | `false` |
| lazyLoad | Whether to enable lazy load，should register [Lazyload](/components/lazyload) component | _boolean_ | `false` |
| show-error | Whether to show error placeholder | _boolean_ | `true` |
| show-loading | Whether to show loading placeholder | _boolean_ | `true` |
| errorNode | Error icon | _string \| VNode_ | - |
| loadingIcon | Loading icon | _string \| VNode_ | - |
| errorIcon | Error icon | _string_ | `warning-o` |
| loadingIcon | Loading icon | _string_ | `photo-o` |

### fit optional value

| name | desctription |
| --- | --- |
| contain | Keep aspect ratio, fully display the long side of the image |
| cover | Keep aspect ratio, fully display the short side of the image, cutting the long side |
| fill | Stretch and resize image to fill the content box |
| none | Not resize image |
| scale-down | Take the smaller of `none` or `contain` |

### Events

| Event | Description                      | Arguments      |
| ----- | -------------------------------- | -------------- |
| onClick | Triggered when click image       | _event: Event_ |
