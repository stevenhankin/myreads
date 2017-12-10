import React from 'react';
import { getAll } from './BooksAPI';
import BookListTitle from './BookListTitle';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class BookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: [
        { name: 'currentlyReading', title: 'Currently Reading', books: {} },
        { name: 'wantToRead', title: 'Want To Read', books: {} },
        { name: 'read', title: 'Read', books: {} }
      ]
    };
  }

  componentDidMount() {
    getAll().then(books => {
      const newShelves = this.state.shelves.map(shelf => {
        const bookList = books.filter(book => book.shelf === shelf.name);
        shelf.books = bookList;
        return shelf;
      });
      this.setState({ shelves: newShelves });
    });
  }

  moveBook = (bookId, fromShelf, toShelf) => {
    // TODO
  };

  render() {
    return (
      <div className="list-books">
        <BookListTitle />
        <div className="list-books-content">
          <div>
            {this.state.shelves.map(shelf => (
              <BookShelf
                key={shelf.name}
                shelf={shelf.name}
                bookShelfTitle={shelf.title}
                books={shelf.books}
              />
            ))}
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
