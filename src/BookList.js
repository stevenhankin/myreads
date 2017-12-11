import React from 'react';
import Book from './Book';

function BookList(props) {
  let listItems;
  console.log('BookList', props.books);
  /* Only display books once some are retrieved for the shelf */
  if (props.books && props.books.length) {
    listItems = props.books
      .filter(book => {
        /* Only display books that are assigned to this shelf */
        console.log('book', book.shelf);
        console.log('props', props.shelf);
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
