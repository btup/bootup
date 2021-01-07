const execa = require("execa");
const Listr = require("listr");
const chalk = require("chalk");
const pkg = require("./package.json");
require("please-upgrade-node")(pkg, {
  message: function (requiredVersion) {
    return chalk.red(
      `Bootup requires Node ${requiredVersion}. Please upgrade Node to use it.`
    );
  },
});

const argv = require("minimist")(process.argv.slice(2), {
  string: ["input", "output", "branch"],
  boolean: ["help"],
  unknown: function (unknownArgument) {
    console.error(
      `We don’t know what '${unknownArgument}' is. Use --help to see the list of supported commands.`
    );
  },
});

const bootBranch = argv.branch;
const bootInput = argv.input;
const bootOutput = argv.output;

const tasks = new Listr([
  {
    title: "Git clone",
    task: () => {
      return new Listr([
        {
          title: "Cloning",
          task: () =>
            execa("git", [
              `clone`,
              `https://github.com/${bootInput}`,
              `${bootOutput}`,
            ]),
        },
        {
          title: "Going into the folder",
          task: () => process.chdir(`${bootOutput}`),
        },
      ]);
    },
  },
  {
    title: "npm install",
    task: () => execa("npm", ["install"]),
  },
  {
    title: "Setting up new git branch",
    task: () => {
      return new Listr([
        {
          title: "git branch",
          task: () => execa("git", ["branch", `${bootBranch}`]),
        },
        {
          title: "git checkout",
          task: () => execa("git", ["checkout", `${bootBranch}`]),
        },
      ]);
    },
  },
]);

function run() {
  console.log("bootup");
  tasks.run().catch((err) => {
    console.error(err);
  });
}

function getHelp() {
  console.log(
    "bootup\n" +
      "--help shows this.\n" +
      `--input="[input git repo]" tells me which git repo to clone.\n` +
      `--output="[which folder to clone into]" tells me which folder to clone into.\n` +
      `--branch="[what branch to create]" tells me which git branch to create.\n`
  );
}

if (argv.help) {
  getHelp();
} else {
  run();
}
