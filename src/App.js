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

// class BooksApp extends React.Component {
//   state = {
//     /**
//      * TODO: Instead of using this state variable to keep track of which page
//      * we're on, use the URL in the browser's address bar. This will ensure that
//      * users can use the browser's back and forward buttons to navigate between
//      * pages, as well as provide a good URL they can bookmark and share.
//      */
//     showSearchPage: false
//   };
//
//   render() {
//     return (
//       <div className="app">
//         {this.state.showSearchPage ? <SearchPage /> : <BookView />}
//       </div>
//     );
//   }
// }

export default BooksApp;
