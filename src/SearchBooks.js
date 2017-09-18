import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" 
                                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks['thumbnail']})` }}>
                                    </div>
                                    <div className="book-shelf-changer">
                                        <select onChange={(e) => onAddBook(book,e.target.value)} value="none">
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors && book.authors.toString()}</div> 
                            </div>
                        </li>
                    ))}
                    {searchResults && searchResults.error && (<div>No results found</div>)}
                </ol>
            </div>
          </div>
		)
	}
}

export default SearchBooks
