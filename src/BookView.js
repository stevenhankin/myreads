import React from 'react';
import { getAll } from './BooksAPI';
import BookListTitle from './BookListTitle';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class BookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: {
        currentlyReading: { title: 'Currently Reading', books: [] },
        wantToRead: { title: 'Want To Read', books: [] },
        read: { title: 'Read', books: [] }
      }
    };
  }

  componentDidMount() {
    getAll().then(books => {
      const shelves = this.state.shelves;
      books.map(book => shelves[book.shelf].books.push(book));
      this.setState({ shelves });
    });
  }

  moveBook = (bookId, fromShelf, toShelf) => {
    let shelves = this.state.shelves;
    const bookIdx = shelves[fromShelf].books.findIndex(
      book => book.id === bookId
    );
    shelves[toShelf].books.push(shelves[fromShelf].books[bookIdx]);
    console.log('Now have', shelves[toShelf].books);

    shelves[fromShelf].books = shelves[fromShelf].books.filter(
      book => book.id !== bookId
    );
    console.log('shelves!!', shelves);
    this.setState({ shelves });
    console.log(`move book ${bookId} from ${fromShelf} to ${toShelf}`);
  };

  render() {
    return (
      <div className="list-books">
        <BookListTitle />
        <div className="list-books-content">
          <div>
            {Object.keys(this.state.shelves).map(shelf => (
              <BookShelf
                key={shelf}
                shelf={shelf}
                bookShelfTitle={this.state.shelves[shelf].title}
                books={this.state.shelves[shelf].books}
                moveBook={this.moveBook}
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
