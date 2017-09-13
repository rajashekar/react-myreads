import React, { Component } from 'react'

class ListBooks extends Component {
  render() {
    const { books, onAddBook } = this.props
    const bookShelves = {
      "Currently Reading": books.filter(book => book.shelf === 'currentlyReading'),
      "Want to Read": books.filter(book => book.shelf === 'wantToRead'),
      "Read": books.filter(book => book.shelf === 'read')
    }

    return (
        <div className="list-books">
        {console.log(this.props)}
        {console.log(bookShelves)}
           <div className="list-books-title">
              <h1>MyReads</h1>
           </div>
           <div className="list-books-content">
             <div>
               {Object.keys(bookShelves).map(bookshelf => (
                 <div key={bookshelf} className="bookshelf">
                   <h2 className="bookshelf-title">{bookshelf}</h2>
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
				<a onClick={() => onAddBook()} href="#searchbook">Add a book</a>
            </div>
          </div>
     )
  }
}
export default ListBooks
