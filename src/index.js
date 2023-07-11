import "./ui/settings.js";
import "./handleExfiltrations.js";
import windowObject from "./windowObject.js";

// Restore the console
for (let key in console) {
  const orig = console[key];

  Object.defineProperty(console, key, {
    set() {
      return true;
    },
    get() {
      return orig;
    },
  });
}

// Force properties to be writable for patching
const originalDefineProperty = Object.defineProperty;

Object.defineProperty = function (...args) {
  args[2].configurable = true;

  try {
    return originalDefineProperty.apply(this, args);
  } catch {}
};

Object.freeze = (arg) => arg;

window.neptune = windowObject;
