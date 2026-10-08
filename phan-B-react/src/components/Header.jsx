export default function Header({ favCount }) {
  return (
    <header className="react-header">
      <h2>Thư Viện Lớp Học (React)</h2>
      <div>Sách yêu thích: <strong>{favCount}</strong></div>
    </header>
  );
}