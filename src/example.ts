import { setupSpeaker, speak } from "./lib";
import type { Politeness } from "./lib";

// setup on page load so live regions are in the DOM by the time we call `speak` function
setupSpeaker();

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const input = formData.get("input") as string;
  const politeness = (formData.get("politeness") as Politeness) || "polite";

  speak(input, politeness);
});
