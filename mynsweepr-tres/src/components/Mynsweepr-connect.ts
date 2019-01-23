import Mynsweepr from "./Mynsweepr";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {
    ...state
  };
};
const mapDispatchToProps = () => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mynsweepr);
