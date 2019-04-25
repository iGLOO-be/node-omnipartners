import chokidar from "chokidar";
import execa from "execa";
import fs from "fs-extra";
import pDebounce from "p-debounce";
import path from "path";
import { createSchema } from "../src";

const write = async () => {
  const target = path.resolve(__dirname, "../__generated__/schema.graphql");
  await fs.mkdirp(path.dirname(target));
  await createSchema({
    emitSchemaFile: path.resolve(__dirname, target),
  });
  // tslint:disable-next-line:no-console
  console.log(`File ${target} written!`);
};

const watch = async () => {
  const debouncedWrite = pDebounce(() => {
    const [command, ...args] = process.argv;
    execa(command, args.filter(arg => arg !== "--watch")).stdout.pipe(
      process.stdout,
    );
  }, 500);
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
