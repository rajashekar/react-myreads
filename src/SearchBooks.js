import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

    render() {
        const {query,onSearch,searchResults,onAddBook} = this.props
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                    value={query}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults && !searchResults.error && searchResults.map(book => (
                        <Book book={book} updateShelf={onAddBook}/>
                    ))}
                    {searchResults && searchResults.error && (<div>No results found</div>)}
                </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks
