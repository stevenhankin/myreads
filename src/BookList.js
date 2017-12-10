import React from 'react';
import Book from './Book';

function BookList(props) {
  let listItems;
  /* Only display books once some are retrieved for the shelf */
  if (props.books && props.books.length) {
    listItems = props.books
      .filter(book => {
        /* Only display books that are assigned to this shelf */
        return book.shelf === props.shelf;
      })
      .map(book => (
        <li key={book.id}>
          <Book book={book} width={128} height={193} />
        </li>
      ));
  }
  return <ol className="books-grid">{listItems}</ol>;
}

export default BookList;
