module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    "no-unused-vars": "off",
    "no-console": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react/no-unknown-property": ["error", { ignore: ["jsx"] }],
    "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
    "@typescript-eslint/no-var-requires": "off",

    //#region  //*=========== Unused Import ===========
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
