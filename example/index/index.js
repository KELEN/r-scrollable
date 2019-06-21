import React from 'react';
import ScrollableContainer from '../../src/components/ScrollableContainer';
import './index.css';

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      items: [1,2,3,4,5]
    }
  }

  addNewItem() {
    const { items } = this.state
    this.setState({
      items: items.concat(Math.random())
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
          distance={400}
          prevButton={
            <div className="op-btn">
            </div>
          }
          nextButton={
            <div className="op-btn">
            </div>
          }
        >
          {
            items.map(item => <div key={item} className="item"></div>)
          }
        </ScrollableContainer>
      </div>
    )
  }
}

export default Index