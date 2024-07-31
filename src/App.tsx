import React from 'react';
import './App.css';
import BookList from './bookListComponent/BookList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Manager</h1>
      </header>
      <main>
        <BookList />
      </main>
    </div>
  );
}

export default App;
