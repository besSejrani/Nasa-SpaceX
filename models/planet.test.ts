import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { filterPlanets } from "./planet.ts";

const habitablePlanet = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const notConfirmed = {
  koi_disposition: "FALSE POSITIVE",
};

const largePlanetRadius = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const largeSolarRadius = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const largeSolarMass = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};

Deno.test("filte habitable planets", () => {
  const filtered = filterPlanets([
    habitablePlanet,
    largePlanetRadius,
    notConfirmed,
    largeSolarMass,
    largeSolarRadius,
  ]);

  assertEquals(filtered, [habitablePlanet]);
});

Deno.test("assert not equal", () => {
  assertNotEquals("dd", "deno");
});
