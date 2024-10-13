# 📢 SR Speak

`sr-speak` provides utilities that utilises ARIA live regions to help screen reader users hear updates happened on the page.

## Install

```bash
npm install sr-speak
```

## Setup "speaker"

Aria live regions need to be inside the DOM for Screen Readers to accurately monitor changes to its content.

```js
import { setupSpeaker } from "sr-speak";

// call setupSpeak on page load
setupSpeaker();
```

You only need to do this once per page load, in the case of a SPA app, call this once in your app initialisation.

## Speak

```js
import { speak } from "sr-speak";

// ...
// (e.g. when user clicks Search button)
speak("Searching..."); // default politeness is 'polite'

// (e.g. error occurred)
speak("You shall not pass", "assertive");
```

## Under the hood and Politeness

When `setupSpeaker` is called, 2 visually hidden elements are created and appended to the body element. These 2 elements are the live regions, one for `polite` messages and the other one for `assertive` messages.

by default, when you call the `speak` function, the `aria-live="polite"` content is updated, you can choose to update the `aria-live="assertive"` live region by specifying the politeness in the second parameter. e.g. `speak('Important message', 'assertive')`

[Read more about live regions in MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions)
