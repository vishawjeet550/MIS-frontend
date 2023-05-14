import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Pagination from './common/Pagination';
import CSVDownload from './CSVDownload';
import { Config } from '../interface/component/DataTable';
import { fetchReports } from '../api';
import useTableData from './hooks/useTableData';

const DataTable = () => {
    const [reportTypes, setReportTypes] = useState<string[]>([]);
    const [selectedReportType, setSelectedReportType] = useState<string>('Dynamic Directives Designer');
    const [filterValue, setFilterValue] = useState('');
    const [page, setPage] = useState(1);
    const { data, isLoading, error }: any = useTableData(page, selectedReportType);

    const handlePDFExport = () => {
        if (!data) return;

        const doc: any = new jsPDF();
        const tableHeaders = Object.keys(data[0].report_data).map((header) => ({
            header,
            dataKey: header,
        }));
        const tableHeaderValues = tableHeaders.map(({ header }) => header); // extract header values
        const tableData = data.map((row: any) => Object.values(row.report_data));
        doc.autoTable({ head: [tableHeaderValues], body: tableData });
        doc.save('table-data.pdf');
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

    useEffect(() => {
        (async () => {
            const data: any = await fetchReports()
            console.log('sdvkdfnkvndfnkvd', data)
            setReportTypes(data);
            setSelectedReportType(data[0]);
        })()
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message}</div>;

    const config: Config = require('./config.json');

    const filteredData = (data || [])?.filter((row: any) => {
        return Object.values(row.report_data).some((value: any) => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(filterValue.toLowerCase());
            }
            return false;
        });
    });

    const pageCount = Math.ceil(data?.count / 10);

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="w-1/3">
                    <select
                        className="w-full border-2 border-gray-300 bg-white py-2 px-4 rounded-lg"
                        onChange={(e) => setSelectedReportType(e.target.value)}
                        value={selectedReportType}
                    >
                        {reportTypes.map((reportType, index) => (
                            <option key={index} value={reportType}>
                                {reportType}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/3">
                    <input
                        type="text"
                        className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg"
                        placeholder="Search..."
                        value={filterValue}
                        onChange={handleFilter}
                    />
                </div>
                <div className="w-1/3 flex justify-end">
                    <CSVDownload
                        csvData={filteredData?.map((row: any) => Object.values(row.report_data))}
                        csvHeaders={config.columns.map(({ title }) => title)}
                        csvFilename={`${selectedReportType}-table-data.csv`}
                    />
                    <button
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2"
                        onClick={handlePDFExport}
                    >
                        Export to PDF
                    </button>
                </div>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {config.columns.map(({ key, title }) => (
                            <th key={key} className="px-4 py-2">
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map((row: any, index: number) => (
                        <tr key={index}>
                            {config.columns.map(({ key }) => (
                                <td key={key} className="border px-4 py-2">
                                    {row.report_data[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} pageCount={pageCount} setPage={setPage} />
        </div >
    );
};

export default DataTable;