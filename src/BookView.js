import React from 'react';
import BookListTitle from './BookListTitle';
import BookShelf from './BookShelf';
import { update } from './BooksAPI';
import PropTypes from 'prop-types';

class BookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: props.shelves
    };
  }

  /*
   Book is being moved to another shelf
   Save the change and update view
  */
  moveBook = (book, fromShelfName, toShelfName) => {
    const shelves = this.state.shelves;

    const reassignShelf = (book, fromShelfName, toShelfName) => {
      const fromShelf = shelves.find(
        shelf => shelf.shelfFilter === fromShelfName
      );
      const toShelf = shelves.find(shelf => shelf.shelfFilter === toShelfName);
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

  // /*
  // Return the shelf name for the specified book.
  // This is executed at this level to access ALL bookshelves
  // but is delegated to the individual book where the shelf can be changed.
  // It's used for highlighting the current shelf on the Book dropdown
  // on the Search Page
  // */
  // whichShelf = (book) => {
  //   this.props.books.find()
  // };

  render() {
    console.log('RENDER', this.state);
    return (
      <div className="list-books">
        <BookListTitle />
        <div className="list-books-content">
          <div>
            {this.state.shelves.map(shelf => (
              <BookShelf
                key={shelf.title}
                shelf={shelf}
                books={this.props.books}
                moveBook={this.moveBook}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

BookView.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BookView;
