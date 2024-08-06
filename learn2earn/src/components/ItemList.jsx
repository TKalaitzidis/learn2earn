// ItemList.jsx
import React, { useState } from "react";
import Item from "./Item";
import Pagination from "./Pagination";


function ItemList(props) {
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 20;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const pagesNo = Math.ceil(props.filteredItems.length / itemsPerPage);

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
                            <Item key={index} author={item.book_author} title={item.book_name}  category={item.book_genre} points={item.book_points} type ={item.book_type} isMain={props.isMain}/>
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
