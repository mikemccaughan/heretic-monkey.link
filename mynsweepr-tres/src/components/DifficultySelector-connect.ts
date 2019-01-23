import { difficultyChanged, heightChanged, widthChanged } from "../reducers";
import DifficultySelector, {
  DifficultySelectorProps
} from "./DifficultySelector";
import { connect } from "react-redux";
import { SyntheticEvent } from "react";

const mapStateToProps = (state: any) => {
  const difficultySelectorState = state.mineBoard || state;
  return <Partial<DifficultySelectorProps>>{
    ...difficultySelectorState
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return <Partial<DifficultySelectorProps>>{
    handleDifficultyChanged: (event: SyntheticEvent<HTMLInputElement>) =>
      dispatch(difficultyChanged(event.currentTarget.value)),
    handleHeightChanged: (event: SyntheticEvent<HTMLInputElement>) =>
      dispatch(heightChanged(event.currentTarget.value)),
    handleWidthChanged: (event: SyntheticEvent<HTMLInputElement>) =>
      dispatch(widthChanged(event.currentTarget.value))
  };
};

export default connect<{}, {}, DifficultySelectorProps>(
  mapStateToProps,
  mapDispatchToProps
)(DifficultySelector);
