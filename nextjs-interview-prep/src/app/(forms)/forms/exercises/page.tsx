import Level1Page from "./LevelOne";
import Level2Page from "./LevelTwo";
import Level3Page from "./LevelThree";
import Level4Page from "./LevelFour";
import Level5Page from "./LevelFive";

const ConceptPage = () => {
  return (
    <>
      <section className="pt-3 pb-6">
        <Level1Page />
      </section>
      <section className="pt-3 pb-6">
        <Level2Page />
      </section>
      <section className="pt-3 pb-6">
        <Level3Page />
      </section>
      <section className="pt-3 pb-6">
        <Level4Page />
      </section>
      <section className="pt-3 pb-6">
        <Level5Page />
      </section> 
    </>
  );
}

export default ConceptPage;
