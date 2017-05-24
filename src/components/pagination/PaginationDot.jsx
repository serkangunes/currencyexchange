import React from 'react';
import PropTypes from 'prop-types'

const styles = {
  root  : {
    height    : 18,
    width     : 18,
    cursor    : 'pointer',
    border    : 0,
    background: 'none',
    padding   : 0,
  },
  dot   : {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    height         : 8,
    width          : 8,
    borderRadius   : 6,
    margin         : 3,
  },
  active: {
    backgroundColor: 'white',
  },
};

class PaginationDot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event)
  {
    this.props.onClick(event, this.props.index);
  };

  render()
  {
    const { active } = this.props;

    let styleDot;

    if (active)
    {
      styleDot = Object.assign({}, styles.dot, styles.active);
    }
    else
    {
      styleDot = styles.dot;
    }

    return (
      <button style={styles.root} onClick={this.handleClick}>
        <div style={styleDot}/>
      </button>
    );
  }
}

PaginationDot.propTypes = {
  active : PropTypes.bool.isRequired,
  index  : PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PaginationDot;