import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import API_BASE_URL from "../services/api"

function MyBlogs() {
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const username = localStorage.getItem("username")
  const accessToken = localStorage.getItem("access_token")

  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
      return
    }

    fetchMyBlogs()
  }, [])

  const fetchMyBlogs = async () => {
    try {
      setLoading(true)      
      setError("")

      const response = await fetch(`${API_BASE_URL}/my-blogs/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (response.status === 401) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("username")

        navigate("/login")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch blogs")
      }

      const data = await response.json()

      // Show only blogs created by logged-in user
    //   const userBlogs = data.filter(
    //     (blog) => blog.author === username
    //   )

    //   setBlogs(userBlogs)
      setBlogs(data)
    } catch (err) {
      setError("Unable to load your blogs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.status === 401) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("username")

        navigate("/login")
        return
      }

      if (response.status === 403) {
        alert("You are not allowed to delete this blog.")
        return
      }

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog.id !== id)
      )
    } catch (err) {
      alert("Unable to delete the blog.")
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Your Content
            </p>

            <h1 className="text-4xl font-bold text-slate-900">
              My Blogs
            </h1>

            <p className="text-slate-500 mt-2">
              Manage the blogs you have created.
            </p>
          </div>

          <Link
            to="/create-blog"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            + Create New Blog
          </Link>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-slate-500 text-lg">
              Loading your blogs...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-5 text-center">
            {error}

            <button
              onClick={fetchMyBlogs}
              className="block mx-auto mt-3 text-blue-600 font-semibold hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-bold mb-5">
              B
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              You haven't created any blogs yet
            </h2>

            <p className="text-slate-500 mt-2 mb-6">
              Start sharing your knowledge with the developer community.
            </p>

            <Link
              to="/create-blog"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Create Your First Blog
            </Link>

          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && blogs.length > 0 && (
          <>
            <div className="mb-5 text-slate-600">
              You have created{" "}
              <span className="font-bold text-slate-900">
                {blogs.length}
              </span>{" "}
              {blogs.length === 1 ? "blog" : "blogs"}.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
                >

                  {/* Top section */}
                  <div className="h-2 bg-blue-600"></div>

                  <div className="p-6 flex flex-col flex-1">

                    {/* Blog ID */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        BLOG #{blog.id}
                      </span>

                      <span className="text-xs text-slate-400">
                        {formatDate(blog.created_date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Content */}
                    <p className="text-slate-600 text-sm leading-6 line-clamp-4 flex-1">
                      {blog.content}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">

                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {username?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {blog.author}
                        </p>

                        <p className="text-xs text-slate-400">
                          Updated {formatDate(blog.updated_date)}
                        </p>
                      </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">

                      <Link
                        to={`/edit-blog/${blog.id}`}
                        className="flex-1 text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2.5 rounded-lg transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="flex-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2.5 rounded-lg transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </article>
              ))}

            </div>
          </>
        )}

      </main>
    </div>
  )
}

export default MyBlogs