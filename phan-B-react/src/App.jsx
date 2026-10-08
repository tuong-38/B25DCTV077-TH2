import { useState } from "react";
import { initialBooks } from "./data/books";
import Header from "./components/Header";
import Section from "./components/Section";
import GenreFilter from "./components/GenreFilter";
import BookList from "./components/BookList";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [books] = useState(initialBooks);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [favorites, setFavorites] = useState([]);

  // Lấy danh sách thể loại không trùng lặp
  const genres = Array.from(new Set(books.map((b) => b.genre)));

  // Bật/tắt yêu thích
  const handleToggleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  // Lọc sách theo thể loại
  const filteredBooks =
    selectedGenre === "All"
      ? books
      : books.filter((b) => b.genre === selectedGenre);

  return (
    <div className="container">
      <Header favCount={favorites.length} />

      <main style={{ margin: "20px 0" }}>
        <Section title="Lọc theo thể loại">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </Section>

        <Section title={`Danh sách sách (${filteredBooks.length}/${books.length})`}>
          <BookList
            books={filteredBooks}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </Section>
      </main>

      <Footer studentName="Phạm Lê Thiên Tường" studentId="B25DCTV077" />
    </div>
  );
}