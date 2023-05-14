import { useQuery } from "react-query";

const useTableData = (page: number, selectedReportType: string) => {
    return useQuery(['tableData', page, selectedReportType], () =>
        fetch(`${process.env.REACT_APP_URL}mis/mis-report?report_type=${selectedReportType}&page=${page}&limit=10`).then((res) => res.json())
    );
};

export default useTableData