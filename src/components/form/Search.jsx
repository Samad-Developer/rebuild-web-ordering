import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search = ({ searchTerm, onSearch, filteredData }) => {
    return (
        <div className="w-[370px] sm:w-[500px] md:w-[900px]">
            <Input
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                suffix={
                    <div className="flex items-center justify-center p-3 md:p-[14px] h-full  bg-red-500 rounded-full transition-all duration-300 hover:bg-red-600">
                        <SearchOutlined className="text-white" style={{ fontSize: '20px' }} />
                    </div>
                }
                placeholder="Search for delicious dishes..."
                className="w-full pl-4 pr-1 py-1 text-lg rounded-full placeholder-gray-800 shadow-custom"
            />
        </div>

    );
};

export default Search;
