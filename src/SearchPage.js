import React from 'react';
import { Link } from 'react-router-dom';
// import BookList from './BookList';
import BookView from './BookView';
import { search } from './BooksAPI';

const shelves = [{ title: 'Library', shelfFilter: undefined, books: [] }];

class SearchPage extends React.Component {
  /*
  SearchPage is a Controlled Component
  */
  state = { searchText: '', shelves, books: [] };

  handleChange = event => {
    const newText = event.target.value.trim();
    this.setState({ searchText: newText });
    if (newText.length > 0) {
      search(newText).then(books => {
        // books.map((book) => shelves.none.books books;
        if (books.length > 0) {
          // shelves[0].books = books;
          this.setState({ books });
          console.log('state', this.state);
        }
      });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookView shelves={this.state.shelves} books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
