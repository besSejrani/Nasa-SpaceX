import { join, BufReader, parse, pick, flatMap } from "../deps.ts";

interface IPlanet {
  [key: string]: string;
}

let planets: Array<IPlanet>;

export const filterPlanets = (planets: Array<IPlanet>) => {
  return planets.filter((planet) => {
    const planataryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return (
      planet["koi_disposition"] === "CONFIRMED" &&
      planataryRadius > 0.5 &&
      planataryRadius < 1.5 &&
      stellarMass > 0.78 &&
      stellarMass < 1.04 &&
      stellarRadius > 0.99 &&
      stellarRadius < 1.01
    );
  });
};

const loadPlanet = async () => {
  const path = join("data", "planets.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    comment: "#",
    skipFirstRow: true,
  });
  Deno.close(file.rid);

  const planets = filterPlanets(result as Array<IPlanet>);

  return planets.map((planet) => {
    return pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ]);
  });
};

planets = await loadPlanet();
console.log(`${planets.length} habitable planets found`);

export const getAllPlanets = () => {
  return planets;
};
