import React from 'react'
import PropTypes from 'prop-types'
import './ScrollableContainer.css'
import createDetectElementResize from '../utils/detectElementResize'
import debounce from '../utils/debounce'

const {
  addResizeListener,
  removeResizeListener
} = createDetectElementResize()

class ScrollableContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showNext: false,
      showPrev: false,
      scrollableContainerTransform: 0,
    }

    this.handleScrollLeft = this.handleScrollLeft.bind(this)
    this.handleScrollRight = this.handleScrollRight.bind(this)
    this.init = this.init.bind(this)
  }

  componentDidMount() {

    const mutationObserverConfig = {
      childList: true
    }
    this.mObserver = new MutationObserver(() => {
      this.init()
    })
    this.mObserver.observe(this.scrollableContainer, mutationObserverConfig)

    this.resizeHandler = () => {
      this.init()
    }
    addResizeListener(this.container, debounce(this.resizeHandler, 200))
  }

  componentWillUnmount() {
    this.mObserver.disconnect()
    removeResizeListener(this.container, this.resizeHandler)
  }

  init() {
    const {
      offsetWidth,
      offsetLeft
    } = this.container

    const {
      scrollableContainerTransform
    } = this.state

    this.scrollableContainerWidth = this.scrollableContainer.offsetWidth
    this.containerWidth = offsetWidth;

    if (this.scrollableContainerWidth < this.containerWidth) {
      // 容器宽度超过子元素的总宽度
      this.setState({
        showPrev: false,
        showNext: false,
        scrollableContainerTransform: 0
      })
    } else {
      // 防止出现子元素的最右空白处理
      const scrollableContainerRect = this.scrollableContainer.getBoundingClientRect()
      const rightDiff = offsetLeft + offsetWidth - scrollableContainerRect.right
      if (rightDiff > 0) {
        this.setState({
          scrollableContainerTransform: scrollableContainerTransform + rightDiff,
          showNext: false
        })
      } else {
        // 正常情况下
        this.setState({
          showPrev: scrollableContainerTransform < 0,
          showNext: offsetWidth < this.scrollableContainerWidth && scrollableContainerTransform <= this.scrollableContainerWidth
        })
      }
    }
  }

  /**
   *  scroll right handler
   */
  handleScrollRight() {
    const {
      scrollableContainerTransform
    } = this.state

    const {
      distance
    } = this.props

    if (Math.abs(scrollableContainerTransform) < this.scrollableContainerWidth) {
      const offset = Math.max(scrollableContainerTransform - distance, -this.scrollableContainerWidth + this.containerWidth)
      this.setState({
        showPrev: true,
        showNext: offset !== -this.scrollableContainerWidth + this.containerWidth,
        scrollableContainerTransform: offset
      })
    } else {
      this.setState({
        showNext: false
      })
    }
  }

   /**
   *  scroll left handler
   */
  handleScrollLeft() {
    const {
      scrollableContainerTransform
    } = this.state

    const {
      distance
    } = this.props

    if (scrollableContainerTransform < 0) {
      const offset = Math.min(scrollableContainerTransform + distance, 0)
      this.setState({
        showPrev: offset !== 0,
        showNext: true,
        scrollableContainerTransform: offset
      })
    }
  }

  render() {
    const {
      showPrev,
      showNext,
      scrollableContainerTransform
    } = this.state

    const {
      className,
      prevButton,
      nextButton
    } = this.props

    const transformStyle = {
      display: 'inline-block',
      position: 'relative',
      transition: 'transform .4s ease',
      transform: `translate3d(${scrollableContainerTransform}px, 0, 0)`
    }

    return (
      <div className={className} ref={container => this.container = container} style={{ overflow: 'hidden' }}>
        {
          showPrev &&
          (
            <div className="r-scrollable-btn r-scrollable-btn--left" onClick={ this.handleScrollLeft }>
              { prevButton ? prevButton : '<-' }
            </div>
          )
        }
        <div ref={scrollableContainer => this.scrollableContainer = scrollableContainer} style={transformStyle}>
          { 
            this.props.children
          }
        </div>
        {
          showNext &&
          (
            <div className="r-scrollable-btn r-scrollable-btn--right" onClick={ this.handleScrollRight }>
              { nextButton ? nextButton : '->' }
            </div>
          )
        }
      </div>
    )
  }
}

ScrollableContainer.propTypes = {
  distance: PropTypes.number,
  prevButton: PropTypes.element,
  NextButton: PropTypes.element
}

ScrollableContainer.defaultProps = {
  distance: 200
}

export default ScrollableContainer;