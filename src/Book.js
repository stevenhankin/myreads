import React from 'react';
import PropTypes from 'prop-types';

const handleChange = (event, props) => {
  const shelf = event.target.value;
  props.moveBook(props.book, props.book.shelf, shelf);
};

const formatUrl = book =>
  book.imageLinks && `url("${encodeURI(book.imageLinks.thumbnail)}")`;

function Book(props) {
  // Book is a Controlled Component to handle state changes of the SELECT
  // element.  See https://reactjs.org/docs/forms.html#the-select-tag
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: formatUrl(props.book)
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={props.whichShelf(props.book.id)}
            onChange={e => handleChange(e, props)}
          >
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
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">
        {props.book.authors && props.book.authors.join(', ')}
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  moveBook: PropTypes.func.isRequired,
  whichShelf: PropTypes.func.isRequired
};

export default Book;
