import React from 'react';
import BookView from './BookView';
import { Link } from 'react-router-dom';

function DefaultView(props) {
  return (
    <div>
      <BookView
        shelves={props.shelves}
        shelfBooks={props.shelfBooks}
        displayBooks={props.shelfBooks}
        whichShelf={props.whichShelf}
        moveBook={props.moveBook}
      />
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default DefaultView;
