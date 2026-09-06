const {
  DEFAULT_LOCALE,
  FRENCH_DEFAULT_COUNTRIES,
  VERCEL_IP_COUNTRY_HEADER,
  localeFromCountry,
} = await import(new URL("../lib/i18n/geo.ts", import.meta.url).href);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(DEFAULT_LOCALE === "en", "safe default when geo is unknown is EN");
assert(VERCEL_IP_COUNTRY_HEADER === "x-vercel-ip-country", "Vercel country header");

for (const country of ["FR", "BE", "CH", "MC", "fr", " be ", "ch"]) {
  assert(
    localeFromCountry(country) === "fr",
    `${JSON.stringify(country)} must default to fr`
  );
}

for (const country of ["EE", "US", "GB", "DE", "T1", "XX", "", null, undefined]) {
  assert(
    localeFromCountry(country) === "en",
    `${JSON.stringify(country)} must default to en`
  );
}

assert(FRENCH_DEFAULT_COUNTRIES.has("FR"), "FR is a French-default country");
assert(!FRENCH_DEFAULT_COUNTRIES.has("EE"), "EE must not default to French");

console.log("smoke-geo-lang: ok");
