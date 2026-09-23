import { useEffect, useState } from "react"
import { getBlogs, deleteBlog } from "../services/api"

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await getBlogs()

        if (!result.ok) {
          setError("Unable to load blogs.")
          return
        }

        setBlogs(result.data)
      } catch (error) {
        setError(
          "Unable to connect to the server."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const handleDelete = async (blogId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this blog?"
  )

  if (!confirmed) {
    return
  }

  try {
    const result = await deleteBlog(blogId)

    if (!result.ok) {
      if (result.status === 403) {
        setError("You are not allowed to delete this blog.")
      } else {
        setError("Unable to delete the blog.")
      }

      return
    }

    // Remove deleted blog from the screen
    setBlogs((previousBlogs) =>
      previousBlogs.filter((blog) => blog.id !== blogId)
    )

  } catch (error) {
    setError("Unable to connect to the server.")
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600 text-lg">
          Loading blogs...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-900">
          Blog Feed
        </h1>

        <p className="mt-2 text-slate-500">
          Discover ideas, experiences and knowledge
          from the developer community.
        </p>

        <div className="mt-8">

          {blogs.length === 0 ? (
            <p className="text-slate-500">
              No blogs available.
            </p>
          ) : (
            <div className="space-y-4">

              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-slate-900">
                    {blog.title}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    {blog.content}
                  </p>

                  <div className="mt-4 text-sm text-slate-800">
                    By {blog.author}
                    
                  </div>
                  <p className="mt-1">
                      Created: {new Date(blog.created_date).toLocaleDateString()}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => { window.location.href = `/edit-blog/${blog.id}`; }} 
                      className="flex-1 rounded-lg border border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold
                       text-blue-600 transition duration-200 hover:bg-blue-600 hover:text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-300" > ✏️ Edit </button> 
                       
                  <button onClick={() => {const confirmed = window.confirm("Are you sure you want to delete this blog?")
                  if (confirmed){
                    handleDelete(blog.id)
                  }
                  }}
                  className="flex-1 rounded-lg border border-red-500 bg-white px-4 py-2.5 text-sm font-semibold 
                  text-red-500 transition duration-200 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 
                  focus:ring-red-300" > 🗑️ Delete </button> 
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Blogs