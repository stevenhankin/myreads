import React from 'react';
import Book from './Book';

function BookList(props) {
  let listItems;
  if (props.books.length) {
    listItems = props.books.map(book => (
      <li key={book.id}>
        <Book
          width={128}
          height={193}
          imageUrl={`url('${book.imageLinks.thumbnail}')`}
          title={book.title}
          authors={book.authors}
        />
      </li>
    ));
  }
  return <ol className="books-grid">{listItems}</ol>;
}

export default BookList;
