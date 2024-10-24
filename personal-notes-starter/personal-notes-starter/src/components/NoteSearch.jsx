import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({searchNote}) => {
    const [searchText, setSearchText] = React.useState('');

    const onSearchTextChangeEventHandler = (event) => {
        setSearchText(event.target.value);
    };

    const onSearchEventHandler = (event) => {
        if (searchText.trim()) {
            event.preventDefault();
            searchNote(searchText);
        }
    }

    return (
        <div>
            <form onSubmit={onSearchEventHandler}>
                <input
                    id="search-bar"
                    type="text"
                    value={searchText}
                    onChange={onSearchTextChangeEventHandler}
                    placeholder='Cari catatan..'
                />
                <button type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                </button>
            </form>
        </div>
    )
};

export default SearchBar;