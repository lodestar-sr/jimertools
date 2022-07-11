const spacings = {};
for (let i = -100; i < 500; i += 0.5) {
  spacings[i] = `${i / 4}rem`;
}

module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      spacing: spacings,
      minWidth: spacings,
      minHeight: spacings,
      maxWidth: spacings,
      maxHeight: spacings,
      boxShadow: {
        "md-top":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }
    }
  },
  purge: {
    content: [
      "./src/**/*.vue",
      "./src/**/*.ts",
      "./src/**/*.js",
      "./src/**/*.html",
      "./public/**/*.html"
    ]
  }
};
