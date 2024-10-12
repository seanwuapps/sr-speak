export type Politeness = "polite" | "assertive";

const ID_PREFIX = "sr-speak-";
const SR_RECOGNITION_DELAY = 500; // leave content in DOM long enough for SR to pick up before clearing the content
const SPEAK_DEBOUNCE = 300;

const createLiveRegion = (politeness: Politeness) => {
  const liveRegion = document.createElement("div");
  liveRegion.id = `${ID_PREFIX}${politeness}`;
  liveRegion.setAttribute("aria-live", politeness);
  // each time a partical update happens, the entire content will be announced in full.
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.style.cssText = `
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;`;
  document.body.append(liveRegion);
  return liveRegion;
};

const debounce = (callback, wait) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

/**
 * Append visually hidden aria live regions to the body
 */
export const init = () => {
  createLiveRegion("polite");
  createLiveRegion("assertive");
};

export const speak = debounce(
  (text: string, politeness: Politeness = "polite") => {
    const liveRegion = document.getElementById(`${ID_PREFIX}${politeness}`);
    if (liveRegion) {
      liveRegion.textContent = text;

      setTimeout(() => {
        liveRegion.innerHTML = "";
      }, SR_RECOGNITION_DELAY);
    } else {
      console.warn(
        `[sr-speak] Live region ${ID_PREFIX}${politeness} not found.`
      );
    }
  },
  SPEAK_DEBOUNCE
);
