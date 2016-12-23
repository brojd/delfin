import React, { Component, PropTypes } from 'react';
import { connect, PromiseState } from 'react-refetch';
import { API_URL } from '../../../config';
import Main from './Main.component';
import Loading from '../Loading/Loading.component';
import FetchError from '../FetchError/FetchError.component';

class OuterMain extends Component {
  constructor() {
    super();
  }
  render() {
    const { swimmers, schools, competitions } = this.props;
    const allFetches = PromiseState.all([swimmers, schools, competitions]);

    if (allFetches.pending) {
      return (<Loading />);
    } else if (allFetches.rejected) {
      return (<FetchError />);
    } else if (allFetches.fulfilled) {
      const [swimmers, schools, competitions] = allFetches.value;
      return (
        <Main swimmers={swimmers}
              schools={schools}
              competitions={competitions}
              children={this.props.children} />
      );
    }
  }
}

OuterMain.propTypes = {
  swimmers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  schools: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  competitions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default connect(() => ({
  swimmers: `${API_URL}/swimmers`,
  schools: `${API_URL}/schools`,
  competitions: `${API_URL}/competitions`
}))(OuterMain);
