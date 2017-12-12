import React from 'react';
import './App.css';
import DefaultView from './DefaultView';
import SearchPage from './SearchPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAll, update } from './BooksAPI';

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
  moveBook = (book, fromShelfName, toShelfName) => {
    let shelfBooks = this.state.shelfBooks;
    const shelfBookIndex = shelfBooks.findIndex(b => b.id === book.id);
    let shelfBook = shelfBooks[shelfBookIndex];
    if (!shelfBook) {
      shelfBook = book;
      shelfBooks.push(shelfBook);
    }
    shelfBook.shelf = toShelfName;
    // Update the state OPTIMISTICALLY and handle undo on fail
    this.setState({ shelfBooks });
    update(book, toShelfName).then(
      success => {
        if (toShelfName === 'none') {
          // Books removed from shelves are also removed from the state
          shelfBooks.splice(shelfBookIndex, 1);
        }
      },
      failure => {
        // Undo by switching book back to original shelf
        shelfBook.shelf = fromShelfName || 'none';
        this.setState({ shelfBooks });
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
        </div>
      </Router>
    );
  }
}

export default BooksApp;
