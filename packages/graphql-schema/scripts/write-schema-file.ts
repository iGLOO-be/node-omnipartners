import chokidar from "chokidar";
import execa from "execa";
import fs from "fs-extra";
// import pDebounce from "p-debounce";
import path from "path";
import { buildFullSchema } from "../src";

const write = async () => {
  const target = path.resolve(__dirname, "../__generated__/schema.graphql");
  await fs.mkdirp(path.dirname(target));
  await buildFullSchema({
    emitSchemaFile: path.resolve(__dirname, target),
  });
  // tslint:disable-next-line:no-console
  console.log(`File ${target} written!`);
};

const watch = async () => {
  const debouncedWrite = () => {
    const [command, ...args] = process.argv;
    execa(command, args.filter(arg => arg !== "--watch"), {
      stdout: "inherit",
    });
  }
  chokidar
    .watch("**/**.ts", {
      cwd: path.join(__dirname, "../src"),
    })
    .on("all", () => {
      debouncedWrite();
    });
};

if (process.argv.indexOf("--watch") >= 0) {
  watch();
} else {
  write();
}
