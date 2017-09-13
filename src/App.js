import React, {Component} from 'react'
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

  addBook = () => { 
	this.setState(state => ({
		showSearchPage: true
	}))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
		  <SearchBooks/>
        ) : (
		<ListBooks
			books={this.state.books}
			onAddBook={this.addBook}
		/>
        )}
      </div>
    )
  }
}

export default BooksApp
