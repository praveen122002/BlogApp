import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.detail || "Invalid username or password."
        )
        return
      }

      // Store JWT tokens
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)
      localStorage.setItem("username", formData.username)

      // Go to blogs
      navigate("/blogs")

    } catch (error) {
      setError(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-100">

      <div className="min-h-[calc(100vh-72px)] flex">

        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2  text-black items-center">

          <div className="max-w-xl px-12">

            <h1 className="text-5xl font-bold leading-tight">
              Share Ideas.
              <br />
              Build <span className="text-blue-500">Knowledge.</span>
            </h1>

            <p className="mt-6 text-black-300 text-lg leading-relaxed">
              BlogSpace is a modern blogging platform for
              developers, tech enthusiasts and curious minds.
            </p>

            <div className="mt-10 space-y-7">

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl">
                  ✎
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Write
                  </h3>

                  <p className="text-sm text-slate-800">
                    Share your thoughts and experiences
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl">
                  ◈
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Learn
                  </h3>

                  <p className="text-sm text-slate-800">
                    Discover new technologies and ideas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl">
                  ♧
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Grow
                  </h3>

                  <p className="text-sm text-slate-800">
                    Be part of a growing developer community
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>


        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-8">

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-slate-500">
              Login to your BlogSpace account
            </p>


            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>


              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>


            <p className="text-center text-sm text-slate-500 mt-6">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Create an account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login