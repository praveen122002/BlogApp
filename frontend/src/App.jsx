import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Navbar />
            <Routes>  
               

                

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

        </BrowserRouter>
    );
}

export default App;