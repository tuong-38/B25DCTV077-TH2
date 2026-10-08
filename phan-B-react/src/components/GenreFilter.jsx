export default function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-filter">
      <button
        className={selectedGenre === "All" ? "active" : ""}
        onClick={() => onSelectGenre("All")}
      >
        Tất cả
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          className={selectedGenre === genre ? "active" : ""}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}