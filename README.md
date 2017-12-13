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

## License

The MIT License (MIT)

Copyright (c) 2017 Steven Hankin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
