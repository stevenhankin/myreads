import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function BookList(props) {
  let listItems;
  // console.log('BOOKLIST', props.displayBooks);
  /* Only display books once some are retrieved for the shelf */
  if (props.displayBooks && props.displayBooks.length) {
    // console.log('BookList', props.shelfFilter, props.displayBooks);
    listItems = props.displayBooks
      .filter(book => {
        /* Only display books that are assigned to this shelf */
        // let status = !book.shelf ||
        let status =
          !props.shelfFilter || book.shelf === props.shelfFilter ? true : false;
        //
        // if (book.id === '74XNzF_al3MC') {
        //   console.log('book', book);
        //   console.log('props.shelfFilter', props.shelfFilter);
        //   console.log('book.shelf', book.shelf);
        //   if (status) {
        //     console.log('**** MATCH ****');
        //   } else {
        //     console.log('**** NOOO MATCH ****');
        //   }
        // }

        // status = true;
        return status;
      })
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
    // console.log(listItems);
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
