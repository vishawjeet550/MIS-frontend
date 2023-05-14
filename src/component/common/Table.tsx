import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import 'tailwindcss/tailwind.css';

interface TableProps {
  data: any[];
  columns: Column<any>[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const memoColumns = useMemo(() => columns, []);
  const memoData = useMemo(() => data, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: memoColumns,
    data: memoData,
  });

  return (
    <div className="flex justify-center my-8">
      <table {...getTableProps()} className="table-fixed w-3/4 border-collapse border border-gray-400 shadow-lg rounded-lg">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-black text-white border border-gray-400">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="py-4 px-6 text-left font-bold">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b border-gray-400">
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="py-4 px-6">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
