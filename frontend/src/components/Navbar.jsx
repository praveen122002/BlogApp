import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const accessToken = localStorage.getItem("access_token")
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("username")

    navigate("/login")
  }

  return (
    <nav className="relative h-20 px-6 md:px-12 flex items-center bg-[#080a0d] border-b border-white/10 text-white">

      {/* Logo - LEFT */}
      <Link
        to="/"
        // to={accessToken ? "/blogs" : "/"}
        className="text-2xl font-black tracking-tight"
      >
        <span className="text-white">BLOG</span>
        <span className="text-blue-500">APP</span>
      </Link>

      {/* ================= CENTER NAVIGATION ================= */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 text-sm font-semibold">

        <Link
          to="/blogs"
          className="hover:text-blue-400 transition"
        >
          BLOGS
        </Link>

        <Link
          to={accessToken ? "/create-blog" : "/login"}
          className="hover:text-blue-400 transition"
        >
          CREATE
        </Link>

        <Link
          to={accessToken ? "/my-blogs" : "/login"}
          className="hover:text-blue-400 transition"
        >
          MY BLOGS
        </Link>

      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="ml-auto flex items-center gap-2">

        {accessToken ? (

          <div className="flex items-center gap-3">

            {/* Username */}
            <span className="hidden sm:block text-sm font-semibold">
              {(username || "User").toUpperCase()}
            </span>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              {username?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-white/10 border border-white/10 px-4 py-2 rounded-md text-sm font-bold hover:bg-red-500 hover:border-red-500 transition"
            >
              LOGOUT
            </button>

          </div>

        ) : (

          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="bg-white text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-200 transition"
            >
              LOGIN
            </Link>

            <Link
              to="/register"
              className="bg-white/10 border border-white/10 px-4 py-2 rounded-md text-sm font-bold hover:bg-white/20 transition"
            >
              SIGN UP
            </Link>

          </div>

        )}

      </div>

    </nav>
  )
}

export default Navbar