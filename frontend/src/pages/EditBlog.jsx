import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

const API_BASE_URL = "http://127.0.0.1:8000/api"

function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      const accessToken = localStorage.getItem("access_token")

      if (!accessToken) {
        navigate("/login")
        return
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/blogs/${id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (response.status === 401) {
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          localStorage.removeItem("username")

          navigate("/login")
          return
        }

        if (!response.ok) {
          setError("Unable to load the blog.")
          return
        }

        const data = await response.json()

        setFormData({
          title: data.title || "",
          content: data.content || "",
        })

      } catch (error) {
        console.error("Fetch blog error:", error)
        setError("Unable to connect to the server.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError("")
    setSuccess("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    // Frontend validation
    if (!formData.title.trim()) {
      setError("Blog title is required.")
      return
    }

    if (formData.title.trim().length < 3) {
      setError("Blog title must contain at least 3 characters.")
      return
    }

    if (!formData.content.trim()) {
      setError("Blog content is required.")
      return
    }

    const accessToken = localStorage.getItem("access_token")

    if (!accessToken) {
      navigate("/login")
      return
    }

    try {
      setUpdating(true)

      const response = await fetch(
        `${API_BASE_URL}/blogs/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title: formData.title.trim(),
            content: formData.content.trim(),
          }),
        }
      )

      const data = await response.json()

      console.log("Update response:", data)

      if (response.status === 401) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("username")

        navigate("/login")
        return
      }

      if (response.status === 403) {
        setError("You are not allowed to edit this blog.")
        return
      }

      if (!response.ok) {
        if (data.title) {
          setError(
            Array.isArray(data.title)
              ? data.title[0]
              : data.title
          )
        } else if (data.content) {
          setError(
            Array.isArray(data.content)
              ? data.content[0]
              : data.content
          )
        } else if (data.detail) {
          setError(data.detail)
        } else {
          setError("Failed to update blog.")
        }

        return
      }

      setSuccess("Blog updated successfully!")

      setTimeout(() => {
        navigate("/blogs")
      }, 800)

    } catch (error) {
      console.error("Update error:", error)
      setError("Unable to connect to the server.")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />

        <main className="px-4 sm:px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center">
              <p className="text-slate-600 text-lg">
                Loading blog...
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <main className="px-4 sm:px-6 py-8 sm:py-10">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-xl shadow-sm border border-slate-200">

            <div className="p-6 sm:p-8 md:p-10">

              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-blue-600
                hover:text-blue-700 font-medium transition mb-6"
              >
                <span className="text-xl">←</span>
                Back to Blogs
              </Link>

              <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-bold text-[#071d38]">
                  Edit Blog
                </h1>

                <p className="mt-2 text-slate-500">
                  Update your blog and share your latest ideas.
                </p>

              </div>

              {error && (
                <div
                  className="mb-6 rounded-lg
                  bg-red-50 border border-red-200
                  px-4 py-3 text-red-700"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="mb-6 rounded-lg
                  bg-green-50 border border-green-200
                  px-4 py-3 text-green-700"
                >
                  {success}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >

                <div>

                  <label
                    htmlFor="title"
                    className="block text-lg font-semibold text-[#071d38] mb-3"
                  >
                    Title
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your blog title"
                    className="w-full h-12 px-4
                    border border-slate-300 rounded-lg
                    text-slate-800
                    placeholder-slate-400
                    outline-none
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100
                    transition"
                  />

                </div>

                <div>

                  <label
                    htmlFor="content"
                    className="block text-lg font-semibold text-[#071d38] mb-3"
                  >
                    Content
                  </label>

                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your blog content here..."
                    rows={12}
                    className="w-full h-50 px-4 py-4
                    border border-slate-300 rounded-lg
                    text-slate-800
                    placeholder-slate-400
                    outline-none
                    resize-y
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-100
                    transition"
                  />

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">

                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-blue-300
                    disabled:cursor-not-allowed
                    text-white font-semibold
                    px-8 py-3 rounded-lg
                    transition duration-200"
                  >
                    {updating
                      ? "Updating..."
                      : "Update Blog"}
                  </button>

                  <Link
                    to="/blogs"
                    className="text-center
                    border border-slate-300
                    text-slate-700
                    hover:bg-slate-100
                    font-semibold
                    px-8 py-3 rounded-lg
                    transition duration-200"
                  >
                    Cancel
                  </Link>

                </div>

              </form>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default EditBlog