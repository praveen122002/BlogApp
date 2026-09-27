import { useState } from "react";
import { Link, useNavigate } from "react-router-dom" 

function CreateBlog() {

    const navigate = useNavigate() 
    
    const [formData, setFormData] = useState({ title: "", content: "", })

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => { 
        const { name, value } = e.target 
        setFormData((prev) => ({ ...prev, [name]: value, }))

        setErrors((prev) => ({ ...prev, [name]: "", }))
    }

    const handleSubmit = async (e) => { 
        e.preventDefault() 
        
        setMessage("") 
        setErrors({}) 
        
        // Frontend validation 
        const newErrors = {} 
        if (!formData.title.trim()) { 
            newErrors.title = "Title is required." 
        } 
        
        if (!formData.content.trim()) { 
            newErrors.content = "Content is required." 
        } 
        
        if (Object.keys(newErrors).length > 0) { 
            setErrors(newErrors) 
            return
        } 

        try { 
            setLoading(true) 
            
            const token = localStorage.getItem("access_token") 
            
            if (!token) { 
                setMessage("Please login to create a blog.") 
                navigate("/login") 
                return
            } 

            const response = await fetch( "http://127.0.0.1:8000/api/blogs/", 
                { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, }, 
                    body: JSON.stringify({ title: formData.title, content: formData.content, }), } ) 

            
                    
            const data = await response.json() 
            if (response.ok) { 
                setMessage("Blog created successfully!") 
                setFormData({ title: "", content: "", }) 
                // Redirect to blog list after successful creation 
                setTimeout(() => { navigate("/blogs") }, 1000) 
            
            }   else { 
                    setErrors(data) } 
                
        } catch (error) { 
            setMessage("Unable to connect to the server.") 
        } finally { 
            setLoading(false) 
        } 
    }

    return (
  <div className="min-h-screen bg-slate-100">

    {/* Main Content */}
    <main className="px-4 sm:px-6 py-8 sm:py-10">

      <div className="max-w-5xl mx-auto">

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">

          <div className="p-6 sm:p-8 md:p-10">

            {/* Back Button */}
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-blue-600
              hover:text-blue-700 font-medium transition mb-6"
            >
              <span className="text-xl">←</span>
              Back to Blogs
            </Link>

            {/* Heading */}
            <div className="mb-8">

              <h1 className="text-3xl sm:text-4xl font-bold text-[#071d38]">
                Create Blog
              </h1>

              <p className="mt-2 text-slate-500">
                Share your knowledge, ideas and experiences with the
                developer community.
              </p>

            </div>

            {/* Success / General Message */}
            {message && (
              <div
                className="mb-6 rounded-lg bg-green-50 border border-green-200
                px-4 py-3 text-green-700"
              >
                {message}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* Title */}
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
                  className={`w-full h-12 px-4
                  border rounded-lg
                  text-slate-800
                  placeholder-slate-400
                  outline-none
                  focus:ring-2 focus:ring-blue-100
                  transition
                  ${
                    errors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                />

                {/* Title Error */}
                {errors.title && (
                  <p className="mt-2 text-sm text-red-500">
                    {Array.isArray(errors.title)
                      ? errors.title[0]
                      : errors.title}
                  </p>
                )}

              </div>

              {/* Content */}
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
                  className={`w-full h-50 px-4 py-4
                  border rounded-lg
                  text-slate-800
                  placeholder-slate-400
                  outline-none
                  resize-y
                  focus:ring-2 focus:ring-blue-100
                  transition
                  ${
                    errors.content
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                />

                {/* Content Error */}
                {errors.content && (
                  <p className="mt-2 text-sm text-red-500">
                    {Array.isArray(errors.content)
                      ? errors.content[0]
                      : errors.content}
                  </p>
                )}

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">

                {/* Publish */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`text-white font-semibold
                  px-8 py-3 rounded-lg
                  transition duration-200
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Publishing..." : "Publish Blog"}
                </button>

                {/* Cancel */}
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
);
}

export default CreateBlog;