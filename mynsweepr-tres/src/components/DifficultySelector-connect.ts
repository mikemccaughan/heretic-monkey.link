import {
  difficultyChanged,
  heightChanged,
  widthChanged,
  saveClicked,
  loadClicked
} from "../reducers";
import DifficultySelector, {
  DifficultySelectorProps
} from "./DifficultySelector";
import { connect } from "react-redux";
import { SyntheticEvent } from "react";
import { Board } from "../utils/board";
import { boardLoad } from "../actions/actions";

const mapStateToProps = (state: any) => {
  const difficultySelectorState =
    state.difficultySelector || state.mineBoard || state;
  return {
    ...difficultySelectorState
  } as Partial<DifficultySelectorProps>;
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    handleDifficultyChanged: (event: SyntheticEvent<HTMLInputElement>) =>
      dispatch(difficultyChanged(event.currentTarget.value)),
    handleHeightChanged: (event: SyntheticEvent<HTMLInputElement>) =>
      dispatch(heightChanged(event.currentTarget.value)),
    handleWidthChanged: (event: SyntheticEvent<HTMLInputElement>) =>
      dispatch(widthChanged(event.currentTarget.value)),
    handleSaveClicked: (
      mineBoard: Board,
      event: SyntheticEvent<HTMLButtonElement>
    ) => dispatch(saveClicked(mineBoard)),
    handleLoadClicked: (
      mineBoard: Board,
      event: SyntheticEvent<HTMLButtonElement>
    ) => dispatch(loadClicked(mineBoard)),
    handleBoardLoad: (
      key: { key: string },
      event: SyntheticEvent<HTMLButtonElement>
    ) => dispatch(boardLoad(key))
  } as Partial<DifficultySelectorProps>;
};

export default connect<{}, {}, DifficultySelectorProps>(
  mapStateToProps,
  mapDispatchToProps
)(DifficultySelector);
