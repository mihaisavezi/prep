"use client"
import Level5PerformancePage from "./LevelFive";
import Level4PerformancePage from "./LevelFour";
import Level1PerformancePage from "./LevelOne";
import Level3PerformancePage from "./LevelThree";
import Level2PerformancePage from "./LevelTwo";

const ConceptPage = () => {
  return (
    <>
      <Level1PerformancePage />
      <Level2PerformancePage />
      <Level3PerformancePage />
      {/* <Level4PerformancePage /> */}
      <Level5PerformancePage />
    </>
  );
}

export default ConceptPage;
