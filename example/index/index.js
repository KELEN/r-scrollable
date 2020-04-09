import React from 'react';
import ScrollableContainer from '../../src/components/ScrollableContainer';
import './index.css';

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      items: ["北京", "上海", "成都", "重庆", "杭州", "厦门", "广州", "西安"]
    }
  }

  addNewItem() {
    const { items } = this.state
    this.setState({
      items: items.concat(Math.random().toFixed(2))
    })
  }

  removeItem() {
    const { items } = this.state
    items.pop()
    this.setState({
      items: items
    })
  }

  render() {
    const {
      items
    } = this.state;
    return (
      <div>
        <button onClick={this.addNewItem.bind(this)}>add new item</button>
        <button onClick={this.removeItem.bind(this)}>remove item</button>
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
      </div>
    )
  }
}

export default Index