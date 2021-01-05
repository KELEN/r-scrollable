import React from "react";
import ScrollableContainer from "../../src/components/ScrollableContainer";
import "./index.css";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "distance": 100,
      "items": [
        "北京",
        "上海",
        "成都",
        "重庆",
        "杭州",
        "厦门",
        "广州",
        "西安"
      ]
    };
  }

  componentDidMount() {
    document.title = "r-scrollable";
  }

  addNewItem() {
    const { items } = this.state;
    this.setState({
      "items": items.concat(Math.random().toFixed(2))
    });
  }

  removeItem() {
    const { items } = this.state;
    items.pop();
    this.setState({
      items
    });
  }

  render() {
    const {
      items,
      distance
    } = this.state;
    return (
      <div>
        <div className="row">
          <button onClick={this.addNewItem.bind(this)}> add new item </button>
          <button onClick={this.removeItem.bind(this)}> remove item </button>
        </div>

        <div className="row">
          <label>distance({distance})</label>
          <input
            max="400"
            min="100"
            onChange={(e) => {
              this.setState({
                "distance": e.target.value
              });
            }}
            type="range"
            value={distance}
          />
        </div>

        <ScrollableContainer
          distance={distance}
          nextButton={
            <div className="op-btn-wrap-right">
              <div className="op-btn">
                <svg
                  aria-label="next"
                  className="svg"
                  focusable="false"
                  role="img"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          }
          prevButton={
            <div className="op-btn-wrap-left">
              <div className="op-btn">
                <svg
                  aria-label="previous"
                  className="svg"
                  focusable="false"
                  role="img"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          }
        >
          {
            items.map((item) => (<div key={item}
              className="item">
              {item}
            </div>))
          }
        </ScrollableContainer>
      </div>
    );

  }

}

export default Index;
