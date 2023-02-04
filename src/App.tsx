import logo from './logo.svg';
import './App.css';
import { SideBar } from './components/sidebar/SideBar';
import { PostForm } from './components/postForm/PostForm';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';

const setCSS = (styleName: string) => { };

function App() {
  return (
    <div className="App">
      <SideBar applyStyle={setCSS} />

      <PostForm />

      <Routes>
        <Route path="/:boardId" element={<h1>Board</h1>} />
        <Route path="/:boardId/:threadId/:messageId?" element={<h1>Thread</h1>} />
      </Routes>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
