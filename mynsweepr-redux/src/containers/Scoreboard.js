import Scoreboard from '../components/scoreboard';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    time: state.time,
    timeRunning: state.timeRunning,
    remaining: state.remaining
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoreboard);
