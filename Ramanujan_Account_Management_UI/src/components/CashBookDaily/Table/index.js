import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0 auto',
    marginTop: '0'
  },
  container: {
    minHeight: 200,
    height: 'auto'
  },
  headBox: {
    border: '1px solid rgba(255, 255, 255, .8)'
  }
});


const columns = [
  {
    id: 'date',
    label: 'Date',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'opening_cash_in_hand',
    label: 'Cash In Hand',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'opening_cash_in_bank',
    label: 'Cash In Bank',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'receipts',
    label: 'Receipts',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'payments',
    label: 'Payments',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'bankTransfer',
    label: 'Bank Transfer',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'closing_cash_in_hand',
    label: 'Cash In Hand',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'closing_cash_in_bank',
    label: 'Cash In Bank',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'Remarks',
    label: 'Remarks',
    minWidth: 200,
    align: 'center'
  }
];

export default function SectionTwo ({cashData,getDailyData}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let pagination = false;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead
            style={{
              backgroundColor: '#333',
              color: 'white',
              fontWeight: '600',
            }}
          >
            <tr>
              <th className={classes.headBox} colspan='1'>Date</th>
              <th className={classes.headBox} colspan='2'>Opening Balance</th>
              <th className={classes.headBox} colspan='3'>Transactions</th>
              <th className={classes.headBox} colspan='2'>Closing Balance</th>
            </tr>
            <tr>
              
              <th className={classes.headBox}></th>

              <th className={classes.headBox}>Cash In Hand</th>
              <th className={classes.headBox}>Cash In Bank</th>

              <th className={classes.headBox}>{ getDailyData ? 'Total Income(Credit)' : 'Received' }</th>
              <th className={classes.headBox}>{ getDailyData ? 'Total Expenses(Debit)' : 'Payments' }</th>
              <th className={classes.headBox}>{ getDailyData ? 'Bank Transfer' : 'Bank Transfer' }</th>
              
              <th className={classes.headBox}>Cash In Hand</th>
              <th className={classes.headBox}>Cash In Bank</th>

            </tr>
          </TableHead>
          <TableBody>
            {cashData && cashData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                          column.id==='date' ? value?.split('T')[0] :
                          column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={cashData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
