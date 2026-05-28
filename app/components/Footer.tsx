export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="big">IBRIK</div>
        <div className="row">
          <div className="col">
            <h5>Visit</h5>
            <a>Strada Smârdan 14</a>
            <a>Bucharest, RO</a>
            <a>+40 21 234 56 78</a>
            <a>bună@ibrik.ro</a>
          </div>
          <div className="col">
            <h5>Menu</h5>
            <a href="#menu">Starters</a>
            <a href="#menu">Mains</a>
            <a href="#menu">Sweets</a>
            <a href="#menu">Drinks</a>
          </div>
          <div className="col">
            <h5>Follow</h5>
            <a>Instagram · @ibrikkitchen</a>
            <a>TikTok · @ibrik</a>
            <a>Newsletter</a>
          </div>
          <div className="col">
            <h5>Care of</h5>
            <a>Private events</a>
            <a>Cooking classes</a>
            <a>Gift cards</a>
            <a>Press kit</a>
          </div>
        </div>
        <div className="bottom">
          <span>
            © MMXXVI Ibrik Kitchen SRL · made with poftă in Bucharest
          </span>
          <span>★ Romanian · Carpathian · Slow</span>
        </div>
      </div>
    </footer>
  );
}
