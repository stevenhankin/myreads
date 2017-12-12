import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

function BookShelf(props) {
  let shelfTitle = null;
  // Conditional: No title is displayed for the Search Page
  if (props.shelfTitle) {
    shelfTitle = <h2 className="bookshelf-title">{props.shelfTitle}</h2>;
  }
  return (
    <div className="bookshelf">
      {shelfTitle}
      <div className="bookshelf-books">
        <BookList
          shelfFilter={props.shelfFilter}
          displayBooks={props.displayBooks}
          moveBook={props.moveBook}
          whichShelf={props.whichShelf}
        />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelfFilter: PropTypes.string,
  shelfTitle: PropTypes.string,
  displayBooks: PropTypes.array,
  moveBook: PropTypes.func.isRequired,
  whichShelf: PropTypes.func.isRequired
};

export default BookShelf;
