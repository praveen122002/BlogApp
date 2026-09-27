import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs"
import EditBlog from "./pages/EditBlog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Navbar />
            <Routes>

                <Route 
                    path="/" 
                    element={<Home />} 
                />  
                          
                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                

                <Route
                    path="/blogs"
                    element={
                            <ProtectedRoute>
                            <BlogList />
                            </ProtectedRoute>
                          }
                />

                <Route 
                    path="/my-blogs" 
                    element={
                            <MyBlogs />
                        } 
                />

                <Route
                    path="/create-blog"
                    element={
                            <CreateBlog />
                        }
                />

                <Route
                    path="/edit-blog/:id"
                    element={
                            <EditBlog />
                        }
                />
                
                
            </Routes>
            <div className="h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-70" />
            <Footer />
            

        </BrowserRouter>
    );
}

export default App;