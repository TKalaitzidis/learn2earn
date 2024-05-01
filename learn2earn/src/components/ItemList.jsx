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
                <ul className="list-none p-5 flex justify-center items-start flex-wrap">
                    {currentItems.map((item, index) => (
                        <li key={index} >
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
