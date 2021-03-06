const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  developMiddleware: app => {
    app.use(
      "/graphql",
      createProxyMiddleware({
        target: "http://localhost:4001",
      }),
    );
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-catch-links"
  ],
};
