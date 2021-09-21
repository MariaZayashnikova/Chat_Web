import React from 'react'
import './SearchBar.css'
import { Input, Label } from 'reactstrap'
import debounce from 'lodash.debounce'

function SearchBar() {
    function search() {
        console.log('start search')
    }
    return (
        <div className="searchBar">
            <Label for="search" className="labelSearch">
                Поиск:
            </Label>
            <Input
                type="search"
                id="search"
                className="search"
                onInput={debounce(search, 2000)}
            />
        </div>
    )
}

export default SearchBar
