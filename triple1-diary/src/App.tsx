import AppButton from "./components/AppButton";
import Bookshelf from "./components/BookShelf";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center justify-center">
      <h1 className="font-serif text-5xl tracking-wider">
        Triple1 Diary 📖
      </h1>

      <AppButton>Start Writing ✒️</AppButton>
      <Bookshelf />
    </div>
  ) 
}