export type Politeness = "polite" | "assertive";
const DEFAULT_OPTIONS = {
  liveRegionPrefix: "sr-speak-",
  clearContentTimeout: 500,
  speakDebounce: 200,
};

const createLiveRegion = (politeness: Politeness, prefix: string) => {
  const liveRegion = document.createElement("div");
  liveRegion.id = `${prefix}${politeness}`;
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

export interface Options {
  /**
   * prefix for ids of the live region elements
   *
   * default: "sr-speak-"
   */
  liveRegionPrefix?: string;
  /**
   * how long (in ms) to wait for screen readers to pick up the content,
   * after which content is cleared for next speak call
   *
   * default: 500
   */
  clearContentTimeout?: number;
  /**
   * debounce so when multiple speak calls happen at the same time
   * only last one is announced
   *
   * set to 0 to disable debounce
   *
   * default: 200
   */
  speakDebounce?: number;
}

let srSpeakOptions = {
  ...DEFAULT_OPTIONS,
};

/**
 * Append visually hidden aria live regions to the body
 */
export const setupSpeaker = (options?: Options) => {
  srSpeakOptions = { ...srSpeakOptions, ...options };
  const polite = createLiveRegion("polite", srSpeakOptions.liveRegionPrefix);
  const assertive = createLiveRegion(
    "assertive",
    srSpeakOptions.liveRegionPrefix
  );
  return {
    polite,
    assertive,
  };
};

export const speak = debounce(
  (text: string, politeness: Politeness = "polite") => {
    let liveRegion = document.getElementById(
      `${srSpeakOptions.liveRegionPrefix}${politeness}`
    );
    if (!liveRegion) {
      // first time?
      const regions = setupSpeaker();
      liveRegion = regions[politeness];
    }

    liveRegion.textContent = text;

    setTimeout(() => {
      liveRegion.innerHTML = "";
    }, srSpeakOptions.clearContentTimeout);
  },
  srSpeakOptions.speakDebounce
);
