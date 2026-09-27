import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API_BASE_URL from "../services/api"

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
        `${API_BASE_URL}/login/`,
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
    <div className="min-h-[calc(100vh-80px)] bg-[#080a0d] text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />


      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex">


        {/* LEFT SECTION */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center px-12">

          <div className="max-w-xl">

            {/* Small heading */}
            <p className="text-blue-500 font-bold tracking-[0.4em] text-sm mb-6">
              WELCOME TO BLOGAPP
            </p>

            {/* Main heading */}
            <h1 className="text-6xl xl:text-7xl font-black leading-[0.9] tracking-[-0.04em] uppercase">

              SHARE IDEAS
              <br />

              <span className="text-white">
                BUILD
              </span>
              <br />

              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500">
                KNOWLEDGE
              </span>

            </h1>

            <p className="mt-8 text-gray-400 text-lg leading-7 max-w-lg">
              Connect with developers, share technical
              knowledge, discover new ideas, and build
              something meaningful together.
            </p>


            {/* Features */}
            <div className="mt-10 space-y-6">

              {/* Write */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
                  ✎
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    WRITE
                  </h3>

                  <p className="text-sm text-gray-500">
                    Share your thoughts and experiences
                  </p>
                </div>

              </div>


              {/* Learn */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xl">
                  ◈
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    LEARN
                  </h3>

                  <p className="text-sm text-gray-500">
                    Discover technologies and new ideas
                  </p>
                </div>

              </div>


              {/* Grow */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  ♧
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    GROW
                  </h3>

                  <p className="text-sm text-gray-500">
                    Be part of the developer community
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            {/* Login Card */}
            <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">

              {/* Card glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />


              {/* Header */}
              <div className="relative">

                <p className="text-blue-500 text-xs font-bold tracking-[0.3em] mb-3">
                  MEMBER LOGIN
                </p>

                <h2 className="text-3xl font-black text-white">
                  Welcome Back
                </h2>

                <p className="mt-2 text-gray-500">
                  Login to your BlogApp account
                </p>

              </div>


              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="relative mt-8 space-y-5"
              >

                {/* Username */}
                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    className="w-full px-4 py-3.5 bg-[#080a0d] border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />

                </div>


                {/* Password */}
                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3.5 bg-[#080a0d] border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />

                </div>


                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}


                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold rounded-lg transition duration-200 shadow-lg shadow-blue-600/20"
                >
                  {loading ? "LOGGING IN..." : "LOGIN →"}
                </button>

              </form>


              {/* Register */}
              <p className="relative text-center text-sm text-gray-500 mt-7">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition"
                >
                  Create an account
                </Link>

              </p>

            </div>


            {/* Bottom text */}
            <p className="text-center text-xs text-gray-700 tracking-[0.25em] mt-6">
              CODE • SHARE • BUILD • LEARN
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login