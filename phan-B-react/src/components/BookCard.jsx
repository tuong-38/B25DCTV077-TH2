export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <div className="book-card">
      <div>
        <h4>{book.title}</h4>
        <p><strong>Tác giả:</strong> {book.author}</p>
        <p><strong>Thể loại:</strong> {book.genre}</p>
        <p><strong>Năm XB:</strong> {book.year}</p>
      </div>
      <button
        className={`btn-fav ${isFavorite ? "active" : ""}`}
        onClick={() => onToggleFavorite(book.id)}
      >
        {isFavorite ? "★ Đã thích" : "☆ Yêu thích"}
      </button>
    </div>
  );
}