import React, {Component, PropTypes} from 'react';

class Classifications extends Component {
  render() {
    return (
      <div>
        Classifications
      </div>
    );
  }
}

Classifications.propTypes = {
  swimmers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  schools: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  competitions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Classifications;
