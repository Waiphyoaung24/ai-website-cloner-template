/**
 * Suppresses the THREE.Clock deprecation warning from R3F internals.
 * THREE.Clock still works in r183+ — it's just deprecated in favor of Timer.
 * R3F hasn't updated yet, so this filters the specific console warning.
 */
if (typeof window !== "undefined") {
  const origWarn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    origWarn(...args);
  };
}
