// ItemList.jsx
import React, { useState } from "react";
import Item from "./Item";
import Pagination from "./Pagination";


function ItemList({items, username, isMain, setItems}) {
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 20;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const pagesNo = Math.ceil(items.length / itemsPerPage);
    

    return (
        <div className="flex-col ml-72 p-5">
            
            <div className="flex-grow">
                <table className="min-w-full leading-normal overflow-hidden rounded-lg shadow-lg">
                    <thead>
                        <tr className="w-max">
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Author   
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Genre
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Points
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-max border ">
                    {currentItems.map((item, index) => (
                            <Item name={username} key={index} book={item} isMain={isMain} setItems={setItems}/>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    pagesNo={pagesNo}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ItemList;
