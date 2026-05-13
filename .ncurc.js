import { defineConfig } from "npm-check-updates";
const startsWithAtAngular = /^@angular.*$/;

export default defineConfig({
  "upgrade": true,
  "reject": (name, semver) => {
    /*if (startsWithAtAngular.test(name)) {
      return true;
    } else*/ if (name === "typescript") {
      return semver?.major !== 5 || semver?.major === "5";
    }
  }
});
