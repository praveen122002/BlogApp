import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/api"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  })

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")
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

    setErrors({})
    setMessage("")
    setLoading(true)

    try {
      const result = await registerUser(formData)

      if (result.ok) {
        setMessage("Registration successful!")

        setFormData({
          username: "",
          email: "",
          password: "",
          password2: "",
        })

        setTimeout(() => {
          navigate("/login")
        }, 1000)
      } else {
        setErrors(result.data)
      }
    } catch (error) {
      setMessage(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#080a0d] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-37.5 -left-37.5 w-100 h-100 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute -bottom-37.5 -right-37.5 w-100 h-100 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Decorative Shapes */}



      <div className="absolute bottom-32 right-[18%] w-12 h-12 rounded-full border-2 border-blue-500/50 hidden lg:block" />

      <div className="relative z-10 min-h-[calc(100vh-80px)] flex">

        {/* =====================================================
            LEFT SECTION
        ====================================================== */}
        <div className="hidden lg:flex lg:w-1/2 items-center">

          <div className="max-w-xl px-12 xl:px-20">

            {/* Small Heading */}
            <p className="text-blue-500 font-bold tracking-[0.35em] text-sm mb-6">
              JOIN THE COMMUNITY
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight">

              SHARE IDEAS
              <br />

              BUILD
              <br />

              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500">
                KNOWLEDGE.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-7 max-w-lg text-gray-400 text-lg leading-8">
              Create your account and become part of
              a developer community where ideas,
              knowledge and technology come together.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-6">

              {/* Write */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
                  &lt;/&gt;
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    WRITE
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Share your technical knowledge and experiences
                  </p>
                </div>

              </div>

              {/* Learn */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xl">
                  ◈
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    LEARN
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Discover technologies and ideas from developers
                  </p>
                </div>

              </div>

              {/* Grow */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 text-xl">
                  +
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    GROW
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Build your skills with a growing community
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            RIGHT REGISTER CARD
        ====================================================== */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            {/* Card */}
            <div className="bg-[#0d1117]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-7 sm:p-8 shadow-2xl">

              {/* Header */}
              <div className="mb-7">

                <p className="text-blue-500 text-xs font-bold tracking-[0.25em] mb-3">
                  CREATE ACCOUNT
                </p>

                <h2 className="text-3xl font-black text-white">
                  Join BlogApp
                </h2>

                <p className="mt-2 text-gray-500 text-sm">
                  Create your account and start sharing your ideas.
                </p>

              </div>


              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Username */}
                <div>

                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full px-4 py-3 bg-[#080a0d] border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  {errors.username && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.username[0]}
                    </p>
                  )}

                </div>


                {/* Email */}
                <div>

                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#080a0d] border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email[0]}
                    </p>
                  )}

                </div>


                {/* Password */}
                <div>

                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 bg-[#080a0d] border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  {errors.password2 && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password2[0]}
                    </p>
                  )}

                </div>


                {/* Confirm Password */}
                <div>

                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 bg-[#080a0d] border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password[0]}
                    </p>
                  )}

                </div>


                {/* General Error */}
                {errors.non_field_errors && (
                  <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400">
                      {errors.non_field_errors[0]}
                    </p>
                  </div>
                )}


                {/* Success / Connection Message */}
                {message && (
                  <div
                    className={`px-4 py-3 rounded-lg border ${
                      message.includes("successful")
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {message}
                    </p>
                  </div>
                )}


                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition duration-200 shadow-lg shadow-blue-600/20"
                >
                  {loading
                    ? "CREATING ACCOUNT..."
                    : "CREATE ACCOUNT →"}
                </button>

              </form>


              {/* Login */}
              <div className="mt-7 pt-6 border-t border-white/10 text-center">

                <p className="text-sm text-gray-500">
                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="text-blue-500 hover:text-blue-400 font-semibold transition"
                  >
                    Login
                  </Link>
                </p>

              </div>

            </div>


            {/* Bottom Text */}
            <p className="text-center text-xs text-gray-700 tracking-[0.3em] mt-6">
              CODE • SHARE • BUILD • LEARN
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register