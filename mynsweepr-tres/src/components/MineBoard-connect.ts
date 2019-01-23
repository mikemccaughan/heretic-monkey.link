import {
  cellClicked,
  cellDoubleClicked,
  cellRightClicked,
  notificationConfirmed
} from "../reducers";
import MineBoard, { MineBoardProps } from "./MineBoard";
import { IMineCell } from "../utils/board";
import { connect } from "react-redux";
import { SyntheticEvent } from "react";

const mapStateToProps = (state: any) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    confirm: () => dispatch(notificationConfirmed()),
    handleCellClicked: (cell: IMineCell) => {
      return () => {
        dispatch(cellClicked(cell));
      };
    },
    handleCellDoubleClicked: (cell: IMineCell) => {
      return () => {
        dispatch(cellDoubleClicked(cell));
      };
    },
    handleCellRightClicked: (cell: IMineCell) => {
      return (event: SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(cellRightClicked(cell));
      };
    }
  };
};

export default connect<{}, {}, MineBoardProps>(
  mapStateToProps,
  mapDispatchToProps
)(MineBoard);
