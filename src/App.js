import React, {Component} from 'react'
// import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
	BooksAPI.getAll().then((books) => {
		this.setState({books})
	})
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
		  <SearchBooks/>
        ) : (
		<ListBooks
			books={this.state.books}
		/>
        )}
      </div>
    )
  }
}

export default BooksApp
