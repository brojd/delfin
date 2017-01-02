import React, { Component, PropTypes } from 'react';
import { connect, PromiseState } from 'react-refetch';
import { API_URL } from '../../../config';
import Classifications from './Classifications.component';
import Loading from '../../components/Loading/Loading.component';
import FetchError from '../../components/FetchError/FetchError.component';

class OuterMain extends Component {
  constructor() {
    super();
  }
  render() {
    const { swimmers, schools, competitions, competitionSwimmers } = this.props;
    const allFetches = PromiseState.all([competitionSwimmers]);
    if (allFetches.pending) {
      return (<Loading />);
    } else if (allFetches.rejected) {
      return (<FetchError />);
    } else if (allFetches.fulfilled) {
      const [competitionSwimmers] = allFetches.value;
      return (
        <Classifications swimmers={swimmers}
                         schools={schools}
                         competitions={competitions}
                         competitionSwimmers={competitionSwimmers}
                         children={this.props.children}
                         competitionId={this.props.params.competitionId} />
      );
    }
  }
}

OuterMain.propTypes = {
  swimmers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  schools: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  competitions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  competitionSwimmers: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default connect(props => ({
  competitionSwimmers: `${API_URL}/competitions/${props.params.competitionId}/swimmers`
}))(OuterMain);
