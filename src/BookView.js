import React from 'react';
import { getAll } from './BooksAPI';
import BookListTitle from './BookListTitle';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import { update } from './BooksAPI';
import PropTypes from 'prop-types';

class BookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: props.shelves
    };
  }

  componentDidMount() {
    getAll().then(books => {
      const shelves = this.state.shelves;
      console.dir(books);
      books.map(book => {
        if (shelves[book.shelf]) {
          shelves[book.shelf].books.push(book);
        }
      });
      this.setState({ shelves });
    });
  }

  /*
   Book is being moved to another shelf
   Save the change and update view
  */
  moveBook = (book, fromShelfName, toShelfName) => {
    const shelves = this.state.shelves;

    const reassignShelf = (book, fromShelfName, toShelfName) => {
      const fromShelf = shelves[fromShelfName];
      const toShelf = shelves[toShelfName];
      // Add book to new shelf
      if (toShelf) {
        book.shelf = toShelfName;
        toShelf.books.push(book);
      }
      // Remove book from old shelf
      if (fromShelf) {
        fromShelf.books = fromShelf.books.filter(b => b.id !== book.id);
      }
    };

    reassignShelf(book, fromShelfName, toShelfName);

    // Update the state OPTIMISTICALLY
    // and handle undo on fail
    this.setState({ shelves });
    update(book, toShelfName).then(
      success => {},
      failure => {
        window.alert('Oops! Failed to update on server, undoing...', failure);
        // Undo by switching book back to original shelf
        reassignShelf(book, toShelfName, fromShelfName);
        this.setState({ shelves });
      }
    );
  };

  render() {
    return (
      <div className="list-books">
        <BookListTitle />
        <div className="list-books-content">
          <div>
            {Object.keys(this.state.shelves).map(shelf => (
              <BookShelf
                key={shelf}
                shelf={shelf}
                bookShelfTitle={this.state.shelves[shelf].title}
                books={this.state.shelves[shelf].books}
                moveBook={this.moveBook}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

BookView.propTypes = {
  shelves: PropTypes.object.isRequired
};

export default BookView;
