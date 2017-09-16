import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {

  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({books})
    })
  }

  /**
   * Move books between shelf
   */
  onUpdateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => console.log(res))
    this.setState(this.updateState(book, shelf))
   }
  updateState = (book, shelf) => (state => ({books: state.books.reduce(this.updateShelf(book,shelf),[])}))
  updateShelf = (selectedbook,selectedshelf) => (
    (allbooks,book) =>  {
        if(book.id===selectedbook.id) {
            book.shelf = selectedshelf
        }
        allbooks.push(book)
        return allbooks
    })

  render() {
    const bookShelves = {
            currentlyReading: this.state.books.filter(book => book.shelf === 'currentlyReading'),
            wantToRead: this.state.books.filter(book => book.shelf === 'wantToRead'),
            read: this.state.books.filter(book => book.shelf === 'read')
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
          <SearchBooks />
          )}/>
      </div>
    )
  }
}

export default BooksApp
