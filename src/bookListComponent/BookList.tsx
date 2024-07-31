import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from '../bookForm/BookForm';
import './BookList.css';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/items');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/items/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const clearEditingBook = () => {
    setEditingBook(null);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-list">
      <h1>Book List</h1>
      <BookForm onBookAdded={fetchBooks} book={editingBook} clearEditingBook={clearEditingBook} />
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
