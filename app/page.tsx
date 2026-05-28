import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Press from "./components/Press";
import Events from "./components/Events";
import Reserve from "./components/Reserve";
import Location from "./components/Location";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <>
      <Reveal />
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Press />
      <Events />
      <Reserve />
      <Location />
      <Footer />
    </>
  );
}
