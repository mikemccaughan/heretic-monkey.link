import Scoreboard, { ScoreboardProps } from "./Scoreboard";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  const scoreboardState = state.scoreboard ?? state;
  return scoreboardState;
};
const mapDispatchToProps = () => {
  return {};
};
export default connect<{}, {}, ScoreboardProps>(
  mapStateToProps,
  mapDispatchToProps
)(Scoreboard);
