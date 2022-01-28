import React from 'react'
import Table from '../../shared/Table'

const columns = [
  { id: 'enrollment', label: 'Enrollment No', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 150 },
  {
    id: 'mobile',
    label: 'Mobile No',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'dob',
    label: 'DOB',
    minWidth: 70,
    align: 'left'
  },
  {
    id: 'entryDate',
    label: 'Entry Date',
    minWidth: 50,
    align: 'left',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'entryTime',
    label: 'Entry Time',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'exitTime',
    label: 'Exit Time',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'attendedDuration',
    label: 'Attended Duration',
    minWidth: 70,
    align: 'left'
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 70,
    align: 'left'
  }
];

function createData(
  enrollment,
  name,
  mobile,
  dob,
  entryDate,
  entryTime,
  exitTime,
  attendedDuration,
  status
) {
  return {
    enrollment,
    name,
    mobile,
    dob,
    entryDate,
    entryTime,
    exitTime,
    attendedDuration,
    status
  };
}

const rows = [
  createData(
    '1',
    'Shivam',
    '1234567898',
    '07-09-2002',
    '8:30',
    '5:30',
    '8 hour',
    'Present'
  )
];

const StudentAttendenceTable = () => {
    return (
      <div style={{ width: '96%', margin: '0 auto' }}>
        <Table columns={columns} data={rows} pagination={true} />
      </div>
    );
}

export default StudentAttendenceTable
