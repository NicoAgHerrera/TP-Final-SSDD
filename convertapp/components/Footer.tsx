export default function Footer() {
  return (
    <footer
      className="py-3 border-t mt-10"
      style={{
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-fg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center text-sm px-4 leading-relaxed">
        <p>Facultad de Ingeniería — UNMdP</p>
        <p>Trabajo Práctico Final — Sistemas Distribuidos — 2025</p>
        <p>Autores: Basualdo, Juan — Giardino, Tomás — Herrera, Nicolás — Juares, Alan</p>
      </div>
    </footer>
  );
}
