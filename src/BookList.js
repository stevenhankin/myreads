import React from 'react';
import Book from './Book';

function BookList(props) {
  let listItems;
  /* Only display books once some are retrieved for the shelf */
  console.log('props.books', props.books);
  if (props.books && props.books.length) {
    listItems = props.books
      .filter(book => {
        console.log('book.shelf', book.shelf);
        console.log('props.shelf ', props.shelf);
        /* Only display books that are assigned to this shelf */
        return book.shelf === props.shelf;
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

export default BookList;
