import React, {Component} from 'react'
import { Route } from 'react-router-dom'
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
		<Route exact path="/" render={() => (
			<ListBooks
				books={this.state.books}
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
