import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHeader from './TableHeader.jsx'
import TableToolBar from './TableToolBar.jsx';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflow: 'auto',
  },
  tablePagination:{
    flex: '1 1 50%',
  }
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      var selected = this.props.tableData.map(n => n.id);
      this.setState(state => ({ selected: selected}));
      this.props.doSelectedMail(selected);
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    console.log("row id: " + id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  onSelectedChange = (id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    console.log(newSelected);
  }

  onDeleteMail = () => {
    this.props.onDeleteMessage();
  }

  render() {
    const { classes, tableHead, tableTitle, tableTitleSecondary, tableData } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <TableToolBar 
          numSelected={selected.length} 
          tableTitle={tableTitle}
          tableTitleSecondary={tableTitleSecondary}
          onDeleteMessage={() => this.onDeleteMail()}>
          <TablePagination
            className={classes.tablePagination}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage=''
            rowsPerPageOptions={[]}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />
        </TableToolBar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={tableData.length}
              rows={tableHead}
            />
            <TableBody>
              {stableSort(tableData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} onChange={() => this.onSelectedChange(n.id)} color='default' />
                      </TableCell>
                      <TableCell  style={{ textDecoration: 'none' }}  button component={Link} to={'/agent/ticket/' + n.id}>{n.subject}</TableCell>
                      <TableCell  style={{ textDecoration: 'none' }} button component={Link} to={'/agent/ticket/' + n.id}>{n.requester}</TableCell>
                      <TableCell  style={{ textDecoration: 'none' }} button component={Link} to={'/agent/ticket/' + n.id}>{moment(n.requestTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                      <TableCell  style={{ textDecoration: 'none' }} button component={Link} to={'/agent/ticket/' + n.id}>{n.type}</TableCell>
                      <TableCell  style={{ textDecoration: 'none' }} button component={Link} to={'/agent/ticket/' + n.id}>{n.priority}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHead: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  tableTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default withStyles(styles)(connect(mapStateToProps ,mapDispatchToProps)(EnhancedTable));