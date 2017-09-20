import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {
  render() {
    const { bookShelves, onUpdateShelf} = this.props
    const shelfMap = {
        currentlyReading: "Currently Reading",
        wantToRead: "Want To Read",
        read: "Read"
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {Object.keys(bookShelves).map(bookshelf => (
                    <div key={bookshelf} className="bookshelf">
                        <h2 className="bookshelf-title">{shelfMap[bookshelf]}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {bookShelves[bookshelf].map((book) => (
                                    <Book book={book} updateShelf={onUpdateShelf}/>
                                ))}  
                            </ol>
                        </div>
                    </div>
                    ))}  
                </div>
            </div>
            <div className="open-search">
                <Link to='/addbook'>
                    Add a book
                </Link>
            </div>
        </div>
    )
    }
}
export default ListBooks
