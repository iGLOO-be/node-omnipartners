const proxy = require("http-proxy-middleware");

module.exports = {
  developMiddleware: app => {
    app.use(
      "/graphql",
      proxy({
        target: "http://localhost:4001",
      }),
    );
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-catch-links"
  ],
};
