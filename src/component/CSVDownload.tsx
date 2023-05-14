import { CSVLink } from "react-csv";
interface CSVDownloadProps {
    csvData: any[][];
    csvHeaders: string[];
    csvFilename: string;
}

const CSVDownload = ({ csvData, csvHeaders, csvFilename }: CSVDownloadProps) => (
    <CSVLink data={csvData} headers={csvHeaders} filename={csvFilename} target="_blank">
        <div className="bg-blue-500 text-white rounded-lg px-4 py-2">
            Export to CSV
        </div>
    </CSVLink>
);

export default CSVDownload