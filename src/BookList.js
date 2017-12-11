import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function BookList(props) {
  let listItems;
  // console.log('BookList', props.books);
  /* Only display books once some are retrieved for the shelf */
  if (props.books && props.books.length) {
    listItems = props.books
      .filter(book => {
        // console.log(book);
        /* Only display books that are assigned to this shelf */
        // console.log('book', book.shelf);
        // console.log('props', props.shelf);
        return (
          !props.shelf.shelfFilter || book.shelf === props.shelf.shelfFilter
        );
      })
      .map(book => (
        <li key={book.id}>
          <Book
            book={book}
            width={128}
            height={193}
            moveBook={props.moveBook}
          />
        </li>
      ));
  }
  return <ol className="books-grid">{listItems}</ol>;
}

BookList.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default BookList;
