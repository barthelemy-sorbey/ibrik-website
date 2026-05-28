export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-mark">
        IBRIK
      </a>
      <div className="nav-links">
        <a href="#about">Story</a>
        <a href="#menu">Menu</a>
        <a href="#events">Events</a>
        <a href="#visit">Visit</a>
      </div>
      <a href="#reserve" className="nav-cta">
        <span>Reserve a table</span>
      </a>
    </nav>
  );
}
