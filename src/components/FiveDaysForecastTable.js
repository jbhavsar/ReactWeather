import React, { useState, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TablePagination } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const FiveDaysForecastTable = ({ fiveDayForecast, ...props }) => {
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setTablePage(0);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Temp (°C)</StyledTableCell>
              <StyledTableCell align="right">Min Temp (°C)</StyledTableCell>
              <StyledTableCell align="right">Max Temp (°C)</StyledTableCell>
              <StyledTableCell align="right">Wind</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Visual</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(fiveDayForecast).length > 0 ? fiveDayForecast.slice(tablePage * rowsPerPage, tablePage * rowsPerPage + rowsPerPage).map(row => (
              <StyledTableRow key={row.list}>
                {console.log(fiveDayForecast)}
                <StyledTableCell align="left">{row.dt_txt}</StyledTableCell>
                <StyledTableCell align="right">{Math.ceil(row.main.temp - 273.15) + '°C'}</StyledTableCell>
                <StyledTableCell align="right">{Math.ceil(row.main.temp_min - 273.15) + '°C'}</StyledTableCell>
                <StyledTableCell align="right">{Math.ceil(row.main.temp_max - 273.15) + '°C'}</StyledTableCell>
                <StyledTableCell align="right">{row.wind.speed}</StyledTableCell>
                <StyledTableCell align="right">{row.weather[0].description}</StyledTableCell>
                <StyledTableCell align="right"><img
                  style={{ width: 70 }}
                  src={`https://openweathermap.org/img/wn/${row.weather[0].icon}@2x.png`} />
                </StyledTableCell>
              </StyledTableRow>
            )) : '-'}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={fiveDayForecast.length}
        rowsPerPage={rowsPerPage}
        page={tablePage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment>
  );
}

export default FiveDaysForecastTable;