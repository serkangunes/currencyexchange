import React from 'react';
import PropTypes from 'prop-types'

import PaginationDot from './PaginationDot';

const styles = {
  root: {
    position     : 'relative',
    display      : 'flex',
    flexDirection: 'row',
    width        : '11%',
    margin       : '0 auto',
    paddingBottom: '20px'
  },
};

class Pagination extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, index)
  {
    this.props.onChangeIndex(index);
  };

  render()
  {
    const {index, dots} = this.props;

    const children = [];

    for (let i = 0; i < dots; i += 1)
    {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          active={i === index}
          onClick={this.handleClick}
        />,
      );
    }

    return (
      <div style={styles.root}>
        {children}
      </div>
    );
  }
}

Pagination.propTypes = {
  dots         : PropTypes.number.isRequired,
  index        : PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
};

export default Pagination;