# Cell

### Import

```js
import { CellGroup } from 'pant/es/cell-group';
import { Cell } from 'pant/es/cell';
```

## Usage

### Basic Usage

```jsx
<CellGroup>
  <Cell title="Cell title" value="Content" />
  <Cell title="Cell title" value="Content" label="Description" />
</CellGroup>
```

### Size

```jsx
<CellGroup>
  <Cell title="Cell title" value="Content" size="large" />
  <Cell
    title="Cell title"
    value="Content"
    size="large"
    label="Description"
  />
</CellGroup>
```

### Left Icon

```jsx
<CellGroup>
  <Cell title="Cell title" icon="location-o" />
</CellGroup>
```

### Value only

```jsx
<CellGroup>
  <Cell value="Content" />
</CellGroup>
```

### Clickable

```jsx
<CellGroup>
  <Cell title="Cell title" onClick={this.onClick} />
  <Cell title="Cell title" value="Content" onClick={this.onClick} />
  <Cell title="Cell title" value="Content" rightIcon="arrow-down" onClick={this.onClick} />
</CellGroup>
```

### Group Title

```jsx
<CellGroup title="Group 1">
  <Cell title="Cell title" value="Content" />
</CellGroup>
<CellGroup title="Group 2">
  <Cell title="Cell title" value="Content" />
</CellGroup>
```

### Use VNode

```jsx
<CellGroup border>
  <Cell
    rightIcon="arrow"
    title={[<span>Cell title</span>, ' ', <Tag type="danger">Tag</Tag>]}
  >
    Content
  </Cell>
  <Cell icon="shop-o" title="Cell title" rightIcon="search"></Cell>
</CellGroup>
```

### Vertical Center

```jsx
<Cell center title="Cell title" value="Content" label="Description" />
```

## API

### CellGroup Props

| Attribute | Description                  | Type      | Default |
| --------- | ---------------------------- | --------- | ------- |
| title     | Group title                  | _string_  | -       |
| border    | Whether to show outer border | _boolean_ | `true`  |

### Cell Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| children | Right text | _ComponentChildren_ | - |
| title | Title | _ComponentChildren_ | - |
| label | Description below the title | _ComponentChildren_ | - |
| size | Size，can be set to `large` | _string_ | - |
| icon | Left Icon | _string \| VNode_ | - |
| rightIcon | Right Icon | _string \| VNode_ | - |
| border | Whether to show inner border | _boolean_ | `true` |
| center | Whether to center content vertically | _boolean_ | `false` |
| required | Whether to show required mark | _boolean_ | `false` |
| className | Cell className | _string_ | - |
| titleClassName | Title className | _string_ | - |
| valueClass | Value className | _string_ | - |

### Cell Events

| Event | Description               | Arguments      |
| ----- | ------------------------- | -------------- |
| onClick | Triggered when click cell | _event: Event_ |
