import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = {
	bookShelves: {}
  }

  componentDidMount() {
	BooksAPI.getAll().then((books) => {
		this.setState({
			bookShelves : {
				currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
				wantToRead: books.filter(book => book.shelf === 'wantToRead'),
				read: books.filter(book => book.shelf === 'read')
			}
		})
	})
  }

  onUpdateShelf = (book,shelf) => {
	BooksAPI.update(book,shelf).then()
  }

  render() {
    return (
      <div className="app">
		<Route exact path="/" render={() => (
			<ListBooks
				bookShelves={this.state.bookShelves}
			/>
		)}/>
		<Route path="/addbook" render={() => (
		  <SearchBooks/>
		)}/>
      </div>
    )
  }
}

export default BooksApp
