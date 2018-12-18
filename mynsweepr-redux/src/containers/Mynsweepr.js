import Mynsweepr from '../components/mynsweepr';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return Object.assign({}, state);
};
const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mynsweepr);
