import { init, speak } from "./lib";
import type { Politeness } from "./lib";

init({
  liveRegionPrefix: "example-",
  clearContentTimeout: 0,
  speakDebounce: 0,
});

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const input = formData.get("input") as string;
  const politeness = (formData.get("politeness") as Politeness) || "polite";
  speak(input, politeness);
});
