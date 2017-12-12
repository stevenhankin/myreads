import React from 'react';
import './App.css';
import SearchPage from './SearchPage';
import BookView from './BookView';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { getAll, update } from './BooksAPI';

class DefaultView extends React.Component {
  render() {
    return (
      <div>
        <BookView
          shelves={this.props.shelves}
          shelfBooks={this.props.shelfBooks}
          displayBooks={this.props.shelfBooks}
          whichShelf={this.props.whichShelf}
          moveBook={this.props.moveBook}
        />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

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
    const matchedBook = this.state.shelfBooks.find(
      b => (id === b.id ? true : false)
    );
    if (matchedBook) return matchedBook.shelf;
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
    } else if (toShelfName === 'none') {
      // Books removed from shelves are also removed from the state
      shelfBooks.splice(shelfBookIndex, 1);
    }

    shelfBook.shelf = toShelfName;

    // Update the state OPTIMISTICALLY and handle undo on fail
    this.setState({ shelfBooks });
    update(book, toShelfName).then(
      success => {},
      failure => {
        window.alert('Oops! Failed to update on server, undoing...', failure);
        // Undo by switching book back to original shelf
        shelfBook.shelf = fromShelfName;
        this.setState({ shelfBooks });
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
