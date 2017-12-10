import React from 'react';
import BookList from './BookList';

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <BookList shelf={props.shelf} books={props.books} />
      </div>
    </div>
  );
}

export default BookShelf;
