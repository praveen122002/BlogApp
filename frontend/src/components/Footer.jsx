function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            
            <h2 className="text-2xl font-bold">
              <span className="text-white">BLOG</span>
              <span className="text-blue-500">APP</span>
            </h2>    

            <p className="mt-3 text-sm text-gray-400 leading-6">
              A developer-focused blog platform where you can
              share knowledge, ideas, and technical experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            

            <div className="flex flex-col gap-2 text-sm">
              <a
                href="/blogs"
                className="hover:text-blue-400 transition"
              >
                Blogs
              </a>

              <a
                href="/create-blog"
                className="hover:text-blue-400 transition"
              >
                Create Blog
              </a>

              <a
                href="/my-blogs"
                className="hover:text-blue-400 transition"
              >
                My Blogs
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              About BlogApp
            </h3>

            <p className="text-sm text-gray-400 leading-6">
              Where developers share ideas, solve problems, and turn code into knowledge.
            </p>
          </div>

        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-gray-500">
            © 2026 BlogApp. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built with React & Django
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer