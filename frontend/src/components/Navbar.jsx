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
    <nav className="w-full height-90px bg-[#071d38] border-b border-blue-900/50 text-white">
      <div className="h-full max-width-[1440px] mx-auto px-8 flex items-center justify-between">

        <Link to={accessToken ? "/blogs" : "/login"} 
          className="text-3xl font-bold tracking-tight" > 
          <span className="text-white">BLOG</span> 
          <span className="text-blue-500">APP</span> 
        </Link>

        {accessToken ? (

          <div className="flex items-center gap-8">
            <Link to="/blogs" 
              className="text-white text-lg font-medium hover:text-blue-700 transition duration-200">
              Blogs
            </Link>

            <Link to="/create-blog" 
             className="text-white text-lg font-medium hover:text-blue-700 transition duration-200" > 
             Create Blog 
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-white font-semibold"> {username || "User"} </span>

              <div className="w-7 h-7 rounded-full  bg-blue-500 flex items-center justify-center font-bold text-lg"> 
                {username?.charAt(0).toUpperCase() || "U"} 
              </div>

              <button onClick={handleLogout} 
               className="border border-e-white hover:bg-red-500 hover:text-white px-4 py-1  rounded-lg font-medium transition duration-200" > 
               Logout 
              </button>
            </div>
          </div>
        ) : (

          <div className="flex items-center gap-10">
            <Link to="/login" 
              className=" hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-lg transition duration-200" > 
              Login 
            </Link>

            <Link to="/register" 
              className=" hover:bg-blue-700 text-white text-lg font-semibold px-6 py-2 rounded-lg transition duration-200" > 
              Register 
            </Link> 
          </div>
        )}

      </div>
    </nav>

    )

}

export default Navbar