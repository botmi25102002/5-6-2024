import './App.scss';
import React from 'react';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <button>
        <Link to='/users'>go to User page</Link>
      </button>
      <button>
        <Link to='/admin'>go to Admin page</Link>
      </button>
    </div>
  );
}
export default App;
