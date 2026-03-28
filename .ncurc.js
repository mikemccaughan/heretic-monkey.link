const { defineConfig } = require("npm-check-updates");
const startsWithAtAngular = /^@angular.*$/;

module.exports = defineConfig({
  "upgrade": true,
  "reject": (name, semver) => {
    /*if (startsWithAtAngular.test(name)) {
      return true;
    } else*/ if (name === "typescript") {
      return semver?.major !== 5 || semver?.major === "5";
    }
  }
});
