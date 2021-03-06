import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {

  state = {
    books : [], // to hold main page books
    query : '',
    searchResults : []
  }

  /**
   * Calls getAll & loads books which were already added
   */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({books})
    })
  }

  /**
   * Updates books shelfs
   */
  onUpdateShelf = (book, shelf) => {
        if(book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then((res) => console.log(res))
            this.setState(state => ({
                books: this.updateState('list',state.books,book, shelf),
                searchResults: this.updateState('search', state.searchResults, book, shelf)
            }))
        }
   }

  updateState = (fromPage, currentBooks, book, shelf) => currentBooks.reduce(this.updateShelf(fromPage, book,shelf),[])

  updateShelf = (fromPage, selectedbook,selectedshelf) => (
    (allbooks,book) =>  {
        if(book.id===selectedbook.id) {
            book.shelf = selectedshelf
        }
        if(fromPage === 'list' && book.shelf !== 'none') {
            allbooks.push(book)
        }
        if(fromPage === 'search') {
            allbooks.push(book)
        }
        if(!book.shelf) {
            book.shelf = 'none';
        }
        return allbooks
    })

    /**
     * To search books
     */
    searchBooks = (query) => {
        this.setState({query})
        const {books} = this.state
        BooksAPI.search(query).then((searchResults) => {
            if(searchResults) {
                for(var i=0;i<searchResults.length;i++) {
                    for(var j=0;j<books.length;j++) {
                        if(books[j].id === searchResults[i].id) {
                            searchResults[i].shelf = books[j].shelf
                            break;
                        }
                        if(!searchResults[i].shelf) {
                            searchResults[i].shelf = 'none'
                        }
                    }
                }
            }
            this.setState({searchResults})
        })
    }

    /**
     * Add a book
     */
    addBook = (book,shelf) => {
        (!book.shelf || book.shelf === 'none') ? 
            this.setState(state => ({
                books: state.books.concat([{...book,...{shelf}}]),
                searchResults: this.updateState('search', state.searchResults, book, shelf)
            })) : 
            this.setState(state => ({
                books: this.updateState('list',state.books,book, shelf),
                searchResults: this.updateState('search', state.searchResults, book, shelf)
            }))
    }


  render() {
    const {books,query,searchResults} = this.state
    // move books to its own section
    const bookShelves = {
            currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
            wantToRead: books.filter(book => book.shelf === 'wantToRead'),
            read: books.filter(book => book.shelf === 'read')
        }
    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks
                bookShelves={bookShelves}
                onUpdateShelf={this.onUpdateShelf}
            />
            )}/>
        <Route path="/addbook" render={() => (
          <SearchBooks 
              query={query}
              onSearch={this.searchBooks}
              searchResults={searchResults}
              onAddBook={this.addBook}
          />
          )}/>
      </div>
    )
  }
}

export default BooksApp
