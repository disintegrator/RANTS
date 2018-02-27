const compose = require("lodash.flowright");
const withAnalyzer = require("@zeit/next-bundle-analyzer");
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const withGraphQL = require("next-plugin-graphql");

const enhance = compose(withTypescript, withGraphQL, withCSS, withAnalyzer);

module.exports = enhance({
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  typescriptLoaderOptions: {
    configFile: "tsconfig.client.json"
  }
});
