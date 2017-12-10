import React from 'react';
import { getAll } from './BooksAPI';
import BookListTitle from './BookListTitle';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class BookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    getAll().then(books => {
      this.setState({ books });
      console.dir(books);
    });
  }

  render() {
    return (
      <div className="list-books">
        <BookListTitle />
        <div className="list-books-content">
          <div>
            <BookShelf
              shelf="currentlyReading"
              bookShelfTitle="Currently Reading"
              books={this.state.books}
            />
            <BookShelf
              shelf="wantToRead"
              bookShelfTitle="Want To Read"
              books={this.state.books}
            />
            <BookShelf
              shelf="read"
              bookShelfTitle="Read"
              books={this.state.books}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookView;
