import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

class BookShelf extends React.Component {
  render() {
    let shelfTitle = null;
    /* Conditional: No title is displayed for the Search Page */
    if (this.props.shelfTitle) {
      shelfTitle = <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>;
    }
    return (
      <div className="bookshelf">
        {shelfTitle}
        <div className="bookshelf-books">
          <BookList
            shelfFilter={this.props.shelfFilter}
            displayBooks={this.props.displayBooks}
            moveBook={this.props.moveBook}
            whichShelf={this.props.whichShelf}
          />
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  shelfFilter: PropTypes.string,
  shelfTitle: PropTypes.string,
  displayBooks: PropTypes.array,
  moveBook: PropTypes.func.isRequired,
  whichShelf: PropTypes.func.isRequired
};

export default BookShelf;
