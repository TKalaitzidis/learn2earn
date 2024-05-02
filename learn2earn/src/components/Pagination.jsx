import React from "react";

const Pagination = ({ pagesNo, currentPage, setCurrentPage }) => {

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, pagesNo);

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const goToNextPage = () => {
        if (currentPage !== pagesNo)
            setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1);
    };

    return (
        <>
        <div className="py-5"></div>
        <nav className="flex justify-center text-center">
            <a className={`px-5 mx-5 border-none rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
               onClick={currentPage === 1 ? undefined : goToPrevPage}
               aria-disabled={currentPage === 1}>
                Previous
            </a>
            {pageNumbers.map(pgNumber => (
                <a key={pgNumber}
                    className={`px-5 mx-5 border-none rounded-lg ${currentPage === pgNumber ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} transition-all duration-300 ease-in-out`} 
                    onClick={() => setCurrentPage(pgNumber)}>
                    {pgNumber}
                </a>
            ))}
            <a className={`px-5 mx-5 border-none rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-in-out ${currentPage === pagesNo ? 'cursor-not-allowed opacity-50' : ''}`}
               onClick={currentPage === pagesNo ? undefined : goToNextPage}
               aria-disabled={currentPage === pagesNo}>
                Next
            </a>
        </nav>
        <div className="py-5"></div>
        </>
    );
};

export default Pagination;
