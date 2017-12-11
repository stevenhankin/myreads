import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

// const shelves = [
//   { title: 'Currently Reading', shelfFilter: 'currentlyReading', books: [] },
//   { title: 'Want To Read', shelfFilter: 'wantToRead', books: [] },
//   { title: 'Read', shelfFilter: 'read', books: [] }
// ];
// shelfFilter={shelf}
// bookShelfTitle={this.state.shelves[shelf].title}
// books={this.state.shelves[shelf].books}

class BookShelf extends React.Component {
  componentWillReceiveProps(newProps) {
    // const shelf = this.props.shelf;
    console.log('BOOKS', newProps.books);
    // , this.props.books);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
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
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array
};

export default BookShelf;
