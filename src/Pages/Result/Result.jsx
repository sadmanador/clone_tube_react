import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SearchResult from '../../Components/SearchResult/SearchResult';

const Result = ({ sidebar }) => {
    const [category, setCategory] = useState(0);
    
    return (
        <>
        <Sidebar
          sidebar={sidebar}
          category={category}
          setCategory={setCategory}
        />
        <div className={`container ${sidebar ? "" : "large-container"}`}>
          <SearchResult category={category} />
        </div>
      </>
    );
};

export default Result;