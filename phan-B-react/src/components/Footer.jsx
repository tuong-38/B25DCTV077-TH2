export default function Footer({ studentName, studentId }) {
  return (
    <footer className="react-footer">
      <p>{studentName} - {studentId} | Lập trình Web PTIT</p>
    </footer>
  );
}