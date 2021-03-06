import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import "./SearchBox.css";

const Icon = () => <FontAwesomeIcon icon={faSearch} />;

const SearchIcon = ({search}) => (<span
    onClick={search} className='search-icon'>
    <Icon />
</span>);

const SearchBox = ({search}) => {
    const [searchText, changeSearchText] = useState("");
    return (
        <div className="search-box" >
            <input type='text' value={searchText} onChange={(event) => changeSearchText(event.target.value)} />
            <SearchIcon search={()=>search(searchText)} />
        </div>
    )
};

export default SearchBox;

