import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import Header from './components/Header';
import Posts from './components/Posts';
import SinglePost from './components/SinglePost';
import Login from './components/Login';
import Wildcard from './components/Wildcard';
import Register from './components/Register';
import MessagesProvider from './components/context/MessagesContext';
import LoadingProvider from './components/context/LoadingContext';
import Dashboard from './components/Dashboard';
import UpdatePost from './components/UpdatePost';
import CreateNewPost from './components/CreateNewPost';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <MessagesProvider>
          <LoadingProvider>
            <Routes>
              <Route path='/' element={<Navigate to="/posts" />} />
              <Route path='/login/' element={<Login />} />
              <Route path='/register/' element={<Register />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/posts/:id' element={<SinglePost />} />
              <Route path='/user/posts' element={<Dashboard />} />
              <Route path='/user/posts/update/:id' element={<UpdatePost />} />
              <Route path='/user/posts/new' element={<CreateNewPost />} />
              <Route path="*" element={<Wildcard />} />
            </Routes>
          </LoadingProvider>
        </MessagesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
