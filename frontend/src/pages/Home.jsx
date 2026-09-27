import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-[#080a0d] text-white overflow-hidden">

        {/* Floating 3D Cube */}
<div className="cube-wrapper  hidden lg:block">

  <div className="cube">

    {/* Front */}
    <div className="cube-face cube-front">
      <div className="text-center">
        <div className="text-blue-500 text-4xl font-black">
          &lt;/&gt;
        </div>
        <p className="text-gray-400 text-xs tracking-widest mt-3">
          CODE
        </p>
      </div>
    </div>

    {/* Back */}
    <div className="cube-face cube-back">
      <div className="text-center">
        <div className="text-purple-500 text-3xl font-black">
          JS
        </div>
        <p className="text-gray-400 text-xs tracking-widest mt-3">
          REACT
        </p>
      </div>
    </div>

    {/* Right */}
    <div className="cube-face cube-right">
      <div className="text-center">
        <div className="text-cyan-400 text-3xl font-black">
          PY
        </div>
        <p className="text-gray-400 text-xs tracking-widest mt-3">
          PYTHON
        </p>
      </div>
    </div>

    {/* Left */}
    <div className="cube-face cube-left">
      <div className="text-center">
        <div className="text-blue-400 text-3xl font-black">
          DJ
        </div>
        <p className="text-gray-400 text-xs tracking-widest mt-3">
          DJANGO
        </p>
      </div>
    </div>

    {/* Top */}
    <div className="cube-face cube-top">
      <div className="text-center">
        <div className="text-cyan-400 text-3xl font-black">
          SQL
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className="cube-face cube-bottom">
      <div className="text-center">
        <div className="text-purple-500 text-3xl font-black">
          API
        </div>
      </div>
    </div>

  </div>

</div>


      {/* Hero */}
      <main className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6">

        {/* Background glow */}
        <div className="absolute top-20 left-1/2-translate-x-1/2 w-125 h-125bg-blue-600/10 blur-[120px] rounded-full animate-glow"/>

        {/* Decorative shapes */}
        <div className="absolute top-32 left-[8%] w-14 h-14 rounded-2xl bg-blue-600 rotate-12 opacity-80" />

        <div className="absolute top-52 right-[10%] w-10 h-10 rounded-full bg-cyan-400 opacity-80 animate-floating-slow" />

        <div className="absolute bottom-32 left-[15%] w-8 h-8 bg-purple-500 rotate-45 animate-floating-slow" />

        <div className="absolute bottom-40 right-[15%] w-14 h-14 rounded-full border-4 border-blue-500 opacity-70 animate-floating" />

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">

          <p className="text-blue-500 font-bold tracking-[0.4em] text-sm mb-6">
            THE DEVELOPER COMMUNITY
          </p>

          <h1 className="text-[14vw] md:text-[110px] lg:text-[140px] leading-[0.78] font-black tracking-[-0.06em] uppercase">

            BUILD
            <br />

            <span className="text-white">
              THE
            </span>

            <br />

            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500">
              NEXT
            </span>

          </h1>

          <p className="max-w-2xl mx-auto mt-10 text-gray-400 text-base md:text-lg leading-7">
            Share your knowledge. Build your ideas.
            Discover technical stories from developers
            around the world.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/blogs"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition"
            >
              EXPLORE BLOGS →
            </Link> 

            <Link
              to="/register"
              className="px-8 py-4 border border-white/20 hover:bg-white hover:text-black rounded-lg font-bold transition"
            >
              JOIN BLOGAPP
            </Link>

          </div>

        </div>

        {/* Bottom decorative text */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <p className="text-xs tracking-[0.4em] text-gray-600">
            CODE • SHARE • BUILD • LEARN
          </p>
        </div>

      </main>

    </div>
  )
}

export default Home