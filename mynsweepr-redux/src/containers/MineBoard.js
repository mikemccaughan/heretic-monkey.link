import {
  cellClicked,
  cellDoubleClicked,
  cellRightClicked,
  notificationConfirmed,
  buildBoard
} from '../redux-modules/Mynsweepr/index';
import MineBoard from '../components/mineBoard';
import { BoardBuilder } from '../boardBuilder';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    status: state.status,
    height: state.height,
    width: state.width,
    cell: state.cell,
    cells: state.cells,
    buildBoard: state.buildBoard
  };
};

/*
Not thrilled with having this function here that depends on an HTML attribute, but I'm not
sure how to get around it.
 */
function getCellFromEvent(event) {
  let el = event.target;
  let sCell = el.closest('button').getAttribute('data-cell');
  return JSON.parse(sCell);
}

const mapDispatchToProps = dispatch => {
  return {
    doBuildBoard: (width, height) => {
      let cells = BoardBuilder.initializeBoard(
        width,
        height
      );
      dispatch(buildBoard(cells));
    },
    confirm: () => dispatch(notificationConfirmed()),
    handleCellClicked: event => dispatch(cellClicked(getCellFromEvent(event))),
    handleCellDoubleClicked: event =>
      dispatch(cellDoubleClicked(getCellFromEvent(event))),
    handleCellRightClicked: event => {
      event.preventDefault();
      dispatch(cellRightClicked(getCellFromEvent(event)));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MineBoard);
