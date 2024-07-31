import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookForm.css';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface BookFormProps {
  onBookAdded: () => void;
  book?: Book | null;
  clearEditingBook: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ onBookAdded, book, clearEditingBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
    } else {
      setTitle('');
      setAuthor('');
      setDescription('');
    }
  }, [book]);

  const addBook = async () => {
    try {
      if (book) {
        await axios.put(`http://localhost:3001/items/${book.id}`, { title, author, description });
      } else {
        await axios.post('http://localhost:3001/items', { title, author, description });
      }
      onBookAdded();
      clearEditingBook();
      setTitle('');
      setAuthor('');
      setDescription('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="book-form">
      <h2>{book ? 'Edit book' : 'Add a new book'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addBook}>{book ? 'Update Book' : 'Add Book'}</button>
    </div>
  );
};

export default BookForm;
