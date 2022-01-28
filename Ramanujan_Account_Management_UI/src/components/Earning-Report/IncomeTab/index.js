
import React from 'react';
import Table from '../../shared/Table';



const columns = [
    { id: 'date', label: 'Date', minWidth: 120 },
    { id: 'reason', label: 'Reason', minWidth: 250 },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 130,
        align: 'left'
    },
   
];

function IncomeTab({income}) {
    return (
        <div>
            <div>Income</div>
            <Table data={income} columns={columns} pagination={true} />
        </div>
    )
}

export default IncomeTab
