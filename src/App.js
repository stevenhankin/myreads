import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import BookView from './BookView';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const shelves = {
  currentlyReading: { title: 'Currently Reading', books: [] },
  wantToRead: { title: 'Want To Read', books: [] },
  read: { title: 'Read', books: [] }
};

function DefaultView(props) {
  return <BookView shelves={shelves} />;
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
