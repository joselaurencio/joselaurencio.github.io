import nextConfig from "eslint-config-next";

// eslint-config-next's default export is already a native flat-config array
// (TS-aware, includes core-web-vitals) — no FlatCompat/eslintrc bridge
// needed. Using the legacy `next/core-web-vitals` string-extends path here
// hits a real ecosystem bug: eslint-plugin-react's flat config is
// self-referential (`plugins: { react: <itself> }`), and FlatCompat's
// validator throws "Converting circular structure to JSON" trying to
// serialize it for an error message, even with zero actual lint errors.
const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".velite/**", "out/**", "public/pagefind/**", "public/static/**"],
  },
];

export default eslintConfig;
