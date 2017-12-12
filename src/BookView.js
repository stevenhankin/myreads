import React from 'react';
import BookListTitle from './BookListTitle';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

class BookView extends React.Component {
  constructor(props) {
    super(props);
    this.whichShelf = props.whichShelf;
    this.moveBook = props.moveBook;
  }

  render() {
    return (
      <div className="list-books">
        <BookListTitle />
        <div className="list-books-content">
          <div>
            {this.props.shelves.map((shelf, key) => (
              <BookShelf
                key={key}
                shelfFilter={shelf.shelfFilter}
                shelfTitle={shelf.title}
                displayBooks={this.props.displayBooks}
                moveBook={this.moveBook}
                whichShelf={this.whichShelf}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

BookView.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  shelfBooks: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BookView;
