import React from 'react';

class Book extends React.Component {
  /*
  Book is a Controlled Component to handle state changes of the SELECT element
  See https://reactjs.org/docs/forms.html#the-select-tag
  */

  handleChange = event => {
    const shelf = event.target.value;
    this.setState({ shelf });
    this.props.moveBook(this.props.book, this.props.book.shelf, shelf);
  };

  render() {
    const formatUrl = book =>
      book.imageLinks && `url("${encodeURI(book.imageLinks.thumbnail)}")`;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: formatUrl(this.props.book)
            }}
          />
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={this.handleChange}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {this.props.book.authors && this.props.book.authors.join(', ')}
        </div>
      </div>
    );
  }
}

export default Book;
