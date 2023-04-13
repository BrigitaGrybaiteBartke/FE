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
import Register from './components/Register';
import { AuthProvider } from './components/context/AuthContext';
import MessagesProvider from './components/context/MessagesContext';
import LoadingProvider from './components/context/LoadingContext';
import Dashboard from './components/Dashboard';


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


              <Route path='/admin' element={<Dashboard />} />

              <Route path='/posts/search/{id}' element={<Posts />} />;


              {/* wildcard */}
              <Route path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </LoadingProvider>
        </MessagesProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
