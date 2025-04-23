import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/post/CreatePost";
import PostDetails from "./pages/post/PostDetails";
import Register from "./pages/Register";
import NotFoundPage from "./pages/404";
import GlobalStyle from "./styles/GlobalStyle";
import AuthCheck from "./components/common/AuthCheck";
import Tab from "./pages/mypage/Tab";
import CategoryPosts from "./pages/post/CategoryPosts";
import Category from "./pages/post/Category";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <AuthCheck />
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Navigate to="/posts/all" />} />
        <Route path="/posts/all" element={<Home />}></Route>
        <Route path="/posts/category" element={<Category />}></Route>

        {/* 회원 관련련 */}
        <Route path="user/register" element={<Register />} />
        <Route path="user/login" element={<Login />} />

        {/* 게시글 관련 */}
        <Route path="posts/addPost" element={<CreatePost />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="posts/my" element={<Tab />} />
        <Route path="/posts/category/:category" element={<CategoryPosts />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
