import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ListBooks extends Component {
  render() {
    const { bookShelves } = this.props
	const shelfMap = {
		currentlyReading: "Currently Reading",
		wantToRead: "Want To Read",
		read: "Read"
	}

    return (
        <div className="list-books">
		{console.log(shelfMap)}
		{console.log(bookShelves)}
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
                         <li key={book.id}>
                           <div className="book">
                             <div className="book-top">
                               <div className="book-cover" 
                                 style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks['thumbnail']})` }}>
                               </div>
                               <div className="book-shelf-changer">
                                 <select value={book.shelf}>
                                   <option value="none" disabled>Move to...</option>
                                   <option value="currentlyReading">Currently Reading</option>
                                   <option value="wantToRead">Want to Read</option>
                                   <option value="read">Read</option>
                                   <option value="none">None</option>
                                 </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.toString()}</div> 
                           </div>
                        </li>
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
