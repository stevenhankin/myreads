import React from 'react';
import BookView from './BookView';
import { Link } from 'react-router-dom';

class DefaultView extends React.Component {
  render() {
    return (
      <div>
        <BookView
          shelves={this.props.shelves}
          shelfBooks={this.props.shelfBooks}
          displayBooks={this.props.shelfBooks}
          whichShelf={this.props.whichShelf}
          moveBook={this.props.moveBook}
        />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default DefaultView;
