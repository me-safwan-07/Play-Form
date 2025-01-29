import structuredClonePolyfill from "@ungap/structured-clone";

let structuredCloneExport: typeof structuredClonePolyfill;

if (typeof structuredClone === "undefined") {
  structuredCloneExport = structuredClonePolyfill;
} else {
  structuredCloneExport = structuredClone as typeof structuredClonePolyfill;
}

export { structuredCloneExport as structuredClone };
