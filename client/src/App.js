import Home from './component/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Articlelist from './component/article/Articlelist';
import Article from './component/article/Article';
import Error from './component/Error';
import AddArticle from './component/article/AddArticle';
import Register from './component/login/Register';
import Login from './component/login/Login';
import Navuser from './component/header/Navuser';
import Profile from './component/about/Profile';
import UpdateArticle from './component/article/UpdateArticle';

function App() {
  return (
    <Router>
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Navuser" element={<Navuser/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/article-list" element={<Articlelist />} />
        <Route path="/article/:name" element={<Article />} />
        <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/:name/update-article" element={<UpdateArticle/>} /> 
        <Route path="*" element={<Error />} />
      </Routes>
    </>
    </Router>
  );
}

export default App;
