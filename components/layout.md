# Layout

### Intro

Quickly and easily create layouts with `Row` and `Col`

### Import

```js
import { Row } from 'pant/es/row';
import { Col } from 'pant/es/col';
```

## Usage

### Basic Usage

Layout are based on 24-column. The attribute `span` in `Col` means the number of column the grid spans. Of course, You can use `offset` attribute to set number of spacing on the left side of the grid.

```jsx
<Row>
  <Col span="8">span: 8</Col>
  <Col span="8">span: 8</Col>
  <Col span="8">span: 8</Col>
</Row>

<Row>
  <Col span="4">span: 4</Col>
  <Col span="10" offset="4">offset: 4, span: 10</Col>
  <Col span="6">span: 6</Col>
</Row>

<Row>
  <Col offset="12" span="12">offset: 12, span: 12</Col>
</Row>
```

### Column Spacing

Set grid spacing using `gutter` attribute. The default value is 0

```jsx
<Row gutter="20">
  <Col span="8">span: 8</Col>
  <Col span="8">span: 8</Col>
  <Col span="8">span: 8</Col>
</Row>
```

### Flex Layout

Setting `type` to `flex` to enable flex layout

```jsx
<Row type="flex">
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
</Row>

<Row type="flex" justify="center">
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
</Row>

<Row type="flex" justify="end">
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
</Row>

<Row type="flex" justify="space-between">
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
</Row>

<Row type="flex" justify="space-around">
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
  <Col span="6">span: 6</Col>
</Row>
```

## API

### Row Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| type | Layout type, can be set to `flex` | _string_ | - |
| gutter | Grid spacing（px） | _number \| string_ | - |
| justify | Flex main axis，can be set to end/center/space-around/space-between | _string_ | `start` |
| align | Flex cross axis, be set to center/bottom | _string_ | `top` |

### Col Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| children | Col content | _ComponentChildren_ | - |
| span | Number of column the grid spans | _number \| string_ | - |
| offset | Number of spacing on the left side of the grid | _number \| string_ | - |

### Row Events

| Event | Description              | Arguments      |
| ----- | ------------------------ | -------------- |
| onClick | Triggered when click row | _event: Event_ |

### Col Events

| Event | Description              | Arguments      |
| ----- | ------------------------ | -------------- |
| onClick | Triggered when click col | _event: Event_ |
