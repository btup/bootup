# <img src="./media/Bootup.png" alt="Bootup" width="500" />

# Bootup is the ultimate all-in-one command for open source contributors.

## Install

```bash
npm install -g @btup/bootup
```

## Usage

### Bootup currently only works for repos hosted on GitHub.

```text
bootup 
--help shows this.
--input="[input git repo]" tells me which git repo to clone.
--output="[which folder to clone into]" tells me which folder to clone into.
--branch="[what branch to create]" tells me which git branch to create.
```
Parameters `--input`, `--output`, and `--branch` are required. Otherwise it will just show an error.

For `--input`, you don't need to type in the whole git repo URL. Here's how you do it:

```bash
bootup --input="facebook/react" --output="react" --branch="test"
```

You'll still have to type in `cd [insert folder here.]` after it's done.

## Why?

For convenience. Think of Bootup as `create-react-app` for open source contributors.

# License

<a href="https://choosealicense.com/licenses/mit/">MIT</a>