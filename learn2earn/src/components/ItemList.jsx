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
        <div className="flex">
            
            <div className="flex-grow">
                <div className="py-20"></div>
                <ul className="list-none p-5 flex justify-center items-start flex-wrap">
                    {currentItems.map((item, index) => (
                        <li key={index} className="inline-block text-center p-16 m-5 border-2 border-solid border-gray-400 lg:flex-basis-20 lg:max-w-full md:flex-basis-25 md:max-w-25 sm:flex-basis-1/3 sm:max-w-1/3 xs:flex-basis-1/2 xs:max-w-1/2 xxs:flex-basis-full xxs:max-w-full">
                            <Item author={item.author} title={item.title} area={item.area} user={item.user} category={item.category}/>
                        </li>
                    ))}
                </ul>
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
