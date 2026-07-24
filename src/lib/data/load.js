// Data is imported statically and bundled with the app — code and data stay
// atomically consistent, and no "Loading…" state is needed.
import board from "../../data/board.json";
import cities from "../../data/cities.json";
import journey from "../../data/journey.json";
import outside from "../../data/outside.json";
import taxes from "../../data/taxes.json";
import debt from "../../data/debt.json";

export const appData = {
  board,
  cities,
  journey,
  outside,
  taxes,
  debt,
};
