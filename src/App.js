import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import BookView from './BookView';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const BooksApp = () => (
  <Router>
    <div>
      <Route exact path="/" component={BookView} />
      <Route path="/search" component={SearchPage} />
    </div>
  </Router>
);

export default BooksApp;
