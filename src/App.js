import React from 'react';
import './App.css';
import DefaultView from './DefaultView';
import SearchPage from './SearchPage';
import NoMatch from './NoMatch';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getAll, update as updateBook } from './BooksAPI';
import update from 'immutability-helper';

class BooksApp extends React.Component {
  shelves = [
    {
      title: 'Currently Reading',
      shelfFilter: 'currentlyReading'
    },
    { title: 'Want To Read', shelfFilter: 'wantToRead' },
    { title: 'Read', shelfFilter: 'read' }
  ];

  state = { shelfBooks: [] };

  componentDidMount() {
    // Hydrate shelves with user's books
    getAll().then(shelfBooks => {
      if (shelfBooks.length > 0) {
        this.setState({ shelfBooks });
      }
    });
  }

  /*
  For the book of the specified ID,
  find in current bookshelves
  and if exists return the shelf name
  */
  whichShelf = id => {
    const matchedBook = this.state.shelfBooks.find(b => id === b.id);
    if (matchedBook) return matchedBook.shelf || 'none';
    return 'none';
  };
  /*
  Book is being moved to another shelf
  Save the change and update view
  */
  moveBook = (bookOriginal, fromShelfName, toShelfName) => {
    // If the book is moved off the shelf, remove the shelf attribute
    const bookMoved =
      toShelfName === 'none'
        ? update(bookOriginal, { $unset: ['shelf'] })
        : update(bookOriginal, { shelf: { $set: toShelfName } });
    // Create a shortcut alias for this method
    const shelfBooks = this.state.shelfBooks;
    // Find the Index and Object for the book that is being moved
    const shelfBookIndex = shelfBooks.findIndex(b => b.id === bookOriginal.id);
    // Create a copy of the Shelf Books with only the target book
    // updated, using the react immutable helper class
    const newShelfBooks =
      toShelfName === 'none'
        ? update(shelfBooks, { $splice: [[shelfBookIndex, 1]] }) // If book is sent to 'none' then remove book from shelf state
        : shelfBookIndex > 0
          ? update(shelfBooks, {
              $splice: [[shelfBookIndex, 1, bookMoved]] // ELSE If book is already on shelf,  create new array with book on new shelf
            })
          : update(
              shelfBooks,
              { $push: [bookMoved] } //      otherwise if new book then just add the book
            );
    // Update the state OPTIMISTICALLY and handle undo on fail
    this.setState({ shelfBooks: newShelfBooks });
    updateBook(bookOriginal, toShelfName).then(
      success => {},
      failure => {
        // Undo by switching book back to original version
        const undoShelfBooks = update(shelfBooks, {
          $splice: [[shelfBookIndex, 1, bookOriginal]]
        });
        this.setState({ shelfBooks: undoShelfBooks });
        window.alert(
          'Oops! Failed to update server, please try again later...',
          failure
        );
      }
    );
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <DefaultView
                  component={DefaultView}
                  shelves={this.shelves}
                  shelfBooks={this.state.shelfBooks}
                  whichShelf={this.whichShelf}
                  moveBook={this.moveBook}
                />
              )}
            />
            <Route
              path="/search"
              render={() => (
                <SearchPage
                  component={SearchPage}
                  shelfBooks={this.state.shelfBooks}
                  whichShelf={this.whichShelf}
                  moveBook={this.moveBook}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
