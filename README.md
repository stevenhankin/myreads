# MyReads Project

A bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.

This is my first project for the Udacity [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019)

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Component Layout

* Router
  * DefaultView (View of books on shelves)
    * BookView (path='/', Creates a BookShelf for each of 'currentlyReading','wantToRead','read')
      * BookListTitle ("MyReads")
      * BookShelf (3 shelves; Currently Reading, Want To Read, Read)
        * BookList (List of books)
          * Book (A book with handler for updates)
    * Link (to /search)
  * SearchPage (/search)
    * Link (to Home)
    * BookView (path='/', Creates a BookShelf for all searched books)
      * BookListTitle ("MyReads")
      * BookShelf (Single anonymous shelf for all books)
        * BookList (List of books)
          * Book (A book with handler for updates)

## Extra Features

* Optimistic Updates - For better response, UI immediately updates. If server update fails, the UI will revert the changes and prompt user with an error message

## Backend Server API

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
