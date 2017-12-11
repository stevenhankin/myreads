import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import BookView from './BookView';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { getAll } from './BooksAPI';

const shelves = [
  { title: 'Currently Reading', shelfFilter: 'currentlyReading', books: [] },
  { title: 'Want To Read', shelfFilter: 'wantToRead', books: [] },
  { title: 'Read', shelfFilter: 'read', books: [] }
];

class DefaultView extends React.Component {
  state = { shelves, books: [] };

  componentDidMount() {
    getAll().then(books => {
      //const shelves = t his.state.shelves;
      if (books.length > 0) {
        console.log('BOOKS', books);
        this.setState({ books });
      }
    });
  }

  render() {
    return (
      <div>
        <BookView shelves={this.state.shelves} books={this.state.books} />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

const BooksApp = () => (
  <Router>
    <div>
      <Route exact path="/" component={DefaultView} />
      <Route path="/search" component={SearchPage} />
    </div>
  </Router>
);

export default BooksApp;
