module.exports = {
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      proxy: {
        "/api": {
          changeOrigin: true,
          target: "https://api.stlouisfed.org/fred/series",
          pathRewrite: function (path, req) {
            return (
              path.replace("/api", "") +
              "&file_type=json&api_key=" +
              process.env.API_KEY
            );
          },
          secure: false,
        },
      },
    };
  },
};
