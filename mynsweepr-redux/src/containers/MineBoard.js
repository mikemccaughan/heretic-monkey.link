import {
  cellClicked,
  cellDoubleClicked,
  cellRightClicked,
  notificationConfirmed
} from '../redux-modules/Mynsweepr/index';
import MineBoard from '../components/mineBoard';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  //console.log('MineBoard: mapStateToProps: state: ', JSON.stringify(state));
  return {
    status: state.status,
    width: state.width,
    cell: state.cell,
    cells: state.cells
  };
};

function getCellFromEvent(event) {
  let el = event.target;
  let sCell = el.closest('button').getAttribute('data-cell');
  return JSON.parse(sCell);
}

const mapDispatchToProps = dispatch => {
  return {
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
