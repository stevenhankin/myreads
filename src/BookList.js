import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function BookList(props) {
  let listItems;

  // Only display books once some are retrieved for the shelf
  if (props.displayBooks && props.displayBooks.length) {
    listItems = props.displayBooks
      .filter(
        book =>
          // Only display books that are assigned to this shelf
          !props.shelfFilter || book.shelf === props.shelfFilter ? true : false
      )
      .map(book => (
        <li key={book.id}>
          <Book
            book={book}
            width={128}
            height={193}
            moveBook={props.moveBook}
            whichShelf={props.whichShelf}
          />
        </li>
      ));
  }
  return <ol className="books-grid">{listItems}</ol>;
}

BookList.propTypes = {
  shelfFilter: PropTypes.string,
  displayBooks: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
  whichShelf: PropTypes.func.isRequired
};

export default BookList;
