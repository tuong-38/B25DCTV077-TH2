import BookCard from "./BookCard";

export default function BookList({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) {
    return <p>Không tìm thấy cuốn sách nào!</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}