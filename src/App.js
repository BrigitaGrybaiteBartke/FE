// import logo from './logo.svg';
import './App.css';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

import Posts from './components/Posts';
import SinglePost from './components/SinglePost';
import Login from './components/Login';
import Wildcard from './components/Wildcard';
import Register from './components/Register';
import { AuthProvider } from './components/context/AuthContext';
import MessagesProvider from './components/context/MessagesContext';
import LoadingProvider from './components/context/LoadingContext';
import Dashboard from './components/Dashboard';
import Update from './components/Update';
import CreateNewPost from './components/CreateNewPost';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <MessagesProvider>
          <LoadingProvider>
            <Routes>
              <Route path='/' element={<Navigate to="/home" />} />
              <Route path='/home' element={<Home />} />

              <Route path='/login/' element={<Login />} />
              <Route path='/register/' element={<Register />} />

              {/* posts */}
              <Route path='/posts' element={<Posts />} />
              <Route path='/posts/:id' element={<SinglePost />} />

              {/* authenticated user's post */}
              <Route path='/user/posts' element={<Dashboard />} />
              <Route path='/user/posts/update/:id' element={<Update />} />
              <Route path='/user/posts/new' element={<CreateNewPost />} />

              {/* wildcard */}
              <Route path="*" element={<Wildcard />} />
                
            </Routes>
          </LoadingProvider>
        </MessagesProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
