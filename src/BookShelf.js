import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <BookList
            shelf={this.props.shelf}
            books={this.props.books}
            moveBook={this.props.moveBook}
          />
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  bookShelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};

export default BookShelf;
