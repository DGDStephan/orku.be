import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import Timeline from '../src/components/Timeline';
import NosProjets from '../src/components/NosProjets';
import Temoignages from '../src/components/Temoignages';
import Equipe from '../src/components/Equipe';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Timeline />
      <NosProjets />
      <Temoignages />
      <Equipe />
    </>
  );
}
