# Popup

### Import

```js
import { Popup } from 'pant/es/popup';
```

## Usage

### Basic Usage

```jsx
<Cell onClick={showPopup}>Show Popup</Cell>
<Popup show={show}>Content</Popup>
```

```js
function Demo() {
  const [show, setShow] = useState(false);
  const showPopup = () => setShow(true);
}
```

### Position

Use `position` prop to set popup display position

```jsx
<Popup show={show} position="top" />
```

### Close Icon

```jsx
<Popup
  show={show}
  position="bottom"
  closeable
/>
<!-- Custom Icon -->
<Popup
  show={show}
  position="bottom"
  closeIcon="close"
  closeable
/>
<!-- Icon Position -->
<Popup
  show={show}
  position="bottom"
  closeIcon="close"
  closeIconPosition="top-left"
  closeable
/>
```

### Round Corner

```jsx
<Popup show={show} position="bottom" round />
```

### Fade Leave

Positioned popup use slide animation by default. You can set `fadeLeave` prop to use fade animation in leaving stage.

```jsx
<Popup show={show} position="bottom" fadeLeave />
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| children | Popup content | _ComponentChildren_ | - |
| show | Whether to show popup | _boolean_ | `false` |
| overlay | Whether to show overlay | _boolean_ | `true` |
| position | Can be set to `top` `bottom` `right` `left` | _string_ | `center` |
| zIndex | Popup zIndex | _number \| string_ | - |
| className | Popup className | _string_ | - |
| style | Custom style | _Record<string, string \| number>_ | - |
| duration | Transition duration, unit second | _number \| string_ | `0.3` |
| round | Whether to show round corner | _boolean_ | `false` |
| lockScroll | Whether to lock background scroll | _boolean_ | `true` |
| lazyRender | Whether to lazy render util appeared | _boolean_ | `true` |
| closeOnClickOverlay | Whether to close when click overlay | _boolean_ | `true` |
| closeable | Whether to show close icon | _boolean_ | `false` |
| closeIcon | Close icon name | _string_ | `cross` |
| closeIconPosition | Close Icon Position，can be set to `top-left` `bottom-left` `bottom-right` | _string_ | `top-right` |
| safeAreaInsetBottom | Whether to enable bottom safe area adaptation | _boolean_ | `false` |

### Events

| Event        | Description                  | Arguments      |
| ------------ | ---------------------------- | -------------- |
| onClick      | Triggered when click Popup   | _event: Event_ |
| onClickClose | Triggered when click overlay or close button | _event: Event, props: PopupProps_ |
| onOpened     | Triggered when opened Popup  | -              |
| onClosed     | Triggered when closed Popup  | -              |
