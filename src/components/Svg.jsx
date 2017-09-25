import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from '../css/Base.scss'

class Svg extends React.Component {
  render() {
    const { svg, title } = this.props
    if (!svg) {
      return <i>!</i>
    }

    let titleEl
    if (title) {
      titleEl = <title>{title}</title>
    }
    return (
      <svg
        className={classnames(this.props.className, styles.svgIcon)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={this.props.svg.viewBox}
      >
        <use xlinkHref={`#${this.props.svg.id}`}>{titleEl}</use>
      </svg>
    )
  }
}

Svg.defaultProps = {
  className: undefined,
  title: undefined,
}

Svg.propTypes = {
  className: PropTypes.string,
  svg: PropTypes.object,
  title: PropTypes.string,
}

export default Svg
