### 元素溢出显示左右按钮组件

![example picture](https://raw.githubusercontent.com/KELEN/r-scrollable/master/public/scrollable-picture.png)

#### Demo

[Demo](https://KELEN.github.io/r-scrollable/)

#### Install

```bash 
npm i r-scrollable -S
```

#### 声明容器样式

```css
.container {
  position: relative;
  white-space: nowrap;
}
```

#### 使用

```javascript
<ScrollableContainer
  className="container"
  distance={130}
  prevButton={
    <div className="op-btn">
      <svg className="svg" viewBox="0 0 18 18" role="img" aria-label="previous" focusable="false"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd"></path></svg>
    </div>
  }
  nextButton={
    <div className="op-btn">
      <svg className="svg" viewBox="0 0 18 18" role="img" aria-label="next" focusable="false"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg>
    </div>
  }
>
  {
    items.map(item => <div key={item} className="item">{item}</div>)
  }
</ScrollableContainer>
```