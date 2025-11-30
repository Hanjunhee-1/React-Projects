export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center justify-center">
      <h1 className="font-serif text-5xl tracking-wider">
        Triple1 Diary 📖
      </h1>

      <button
        className=" 
          px-6 py-3 rounded-lg
          border border-[var(--ink)]
          transition-all duration-300
          hover:shadow-[0_0_20px_var(--ink)]
          hover:scale-105
        "
      >
        Start Writing ✒️
      </button>
    </div>
  ) 
}