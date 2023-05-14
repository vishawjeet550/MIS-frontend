interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageCount: number;
}

const Pagination = ({ page, setPage, pageCount }: PaginationProps) => {
    const handlePrevClick = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="flex space-x-4">
            <button onClick={handlePrevClick} disabled={page === 1} className="border px-4 py-2 rounded-lg">
                Prev
            </button>
            <button onClick={handleNextClick} disabled={page === pageCount} className="border px-4 py-2 rounded-lg">
                Next
            </button>
        </div>
    );
};

export default Pagination