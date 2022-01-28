
import React from 'react';
import Table from '../../shared/Table';


function ExpensesTab({ expenses, salaryExpenses, eventExpenses }) {
    console.log('expenses',expenses)

    const columns = [
        { id: 'date', label: 'Date', minWidth: 140 },
        { id: 'reason', label: 'Reason', minWidth: 200 },
        {
            id: 'amount',
            label: 'Amount',
            minWidth: 150,
            align: 'left'
        },  
    ];

    return (
        <div>
            <div>Expenses</div>
            <Table data={expenses} columns={columns} pagination={true} />

             Salary Expenses
            <Table data={salaryExpenses} columns={columns} pagination={true} />

            Event Expenses
            <Table data={eventExpenses} columns={columns} pagination={true} />
        </div>
    )
}

export default ExpensesTab
