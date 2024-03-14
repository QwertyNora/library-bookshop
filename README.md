# library-bookshop 📚
## Project for the course Backend 1 at Nackademin 

### Requirements:
- You must be able to create Books and Authors`201`
- Get a list of books and one by author`200`
    - * Get a list of books based on author
    - * Get a list of books based on one of it's genres
    - ** Get a list of books, sorted by publish-year
- Get one book based on ID `200`
    - If it doesen't exist `404`
- Update books/authors `200`
    - If it doesen't exist `404`
    - Borrow book / return book `200`
        - decrement the number of books available
        - If 0, don't accept the request to borrow the book
    - ** If the name of the author is changed, change it so that it is correct in all the author's books
- Delete books/authors `204 eller 200`
    - If it doesn't exist `404`
    - ** if author is removed remove all its books
- * When a book or author is created / updated, it must be validated so that only valid data is entered `400`
