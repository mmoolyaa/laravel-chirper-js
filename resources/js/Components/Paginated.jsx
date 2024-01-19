import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';

const PaginationExample = () => {
    const [chirps, setChirps] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchChirps();
    }, [currentPage]);

    const fetchChirps = async () => {
        try {
            const response = await axios.get(`/api/chirps?page=${currentPage}`);
            setChirps(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {chirps.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}

            <div>
                <Pagination
                    activePage={currentPage}
                    chirpsCountPerPage={10} // Adjust per your backend pagination
                    totalChirpsCount={chirps.total} // Assuming your API returns the total count
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default PaginationExample;
