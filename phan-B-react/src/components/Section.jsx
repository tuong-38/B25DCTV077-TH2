export default function Section({ title, children }) {
  return (
    <section className="react-section">
      <h3>{title}</h3>
      <div className="section-body">{children}</div>
    </section>
  );
}