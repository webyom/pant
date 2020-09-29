# Built-in Style

### Intro

Pant contains some common styles that can be used directly by the className.

### Text ellipsis

When the text content length exceeds the maximum container width, the excess text is automatically omitted.

```jsx
<div class="pant-ellipsis">
  This is a paragraph that displays up to one line of text, and the rest of the
  text will be omitted.
</div>

<div class="pant-multi-ellipsis--l2">
  This is a paragraph that displays up to two lines of text, and the rest of the
  text will be omitted.
</div>

<div class="pant-multi-ellipsis--l3">
  This is a paragraph that displays up to three lines of text, and the rest of
  the text will be omitted.
</div>
```

### Hairline

Add 1px border under the Retina screen for the element, based on a pseudo element.

```jsx
<!-- border top -->
<div class="pant-hairline--top"></div>

<!-- border bottom -->
<div class="pant-hairline--bottom"></div>

<!-- border left -->
<div class="pant-hairline--left"></div>

<!-- border right -->
<div class="pant-hairline--right"></div>

<!-- border top & bottom -->
<div class="pant-hairline--top-bottom"></div>

<!-- full border -->
<div class="pant-hairline--surround"></div>
```

### Animation

```js
import { Transition } from 'pant/es/transition';
```

```jsx
<!-- fade in  -->
<Transition name="fade">
  <div>Fade</div>
</Transition>

<!-- slide up -->
<Transition name="slide-up">
  <div>Slide Up</div>
</Transition>

<!-- slide down -->
<Transition name="slide-down">
  <div>Slide Down</div>
</Transition>

<!-- slide left -->
<Transition name="slide-left">
  <div>Slide Left</div>
</Transition>

<!-- slide right -->
<Transition name="slide-right">
  <div>Slide Right</div>
</Transition>
```
