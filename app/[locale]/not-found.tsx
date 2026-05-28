import { Link } from "../../i18n/navigation";

export const metadata = { title: "404" };

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: 40,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 96 }}>404</h1>
        <p style={{ marginTop: 12 }}>
          <Link href="/" style={{ borderBottom: "1px solid" }}>
            ←
          </Link>
        </p>
      </div>
    </main>
  );
}
