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
    BooksAPI.update(book, shelf).then((res) => console.log(res))
    this.setState(state => ({
        books: this.updateState('list',state.books,book, shelf)
    }))
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
        if(fromPage === 'search' && !book.shelf) {
            allbooks.push(book)
        }
        return allbooks
    })

    /**
     * To search books
     */
    searchBooks = (query) => {
        this.setState({query})
        console.log(query)
        BooksAPI.search(query).then((searchResults) => {
            this.setState({searchResults})
        })
    }

    /**
     * Add a book
     */
    addBook = (book,shelf) => {
        console.log('In add book',book)
        console.log('In add book',shelf)
        console.log('In add book',{...book,...{shelf}})
        this.setState(state => ({
            books: state.books.concat([{...book,...{shelf}}]),
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
