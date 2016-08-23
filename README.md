# Pomidory Timer

Electron 製のポモロード用タイマー

![PomidoryTimer.gif](https://raw.githubusercontent.com/elzup/pomidory-timer/master/readme-img/PomidoryTimer.gif)

* 最前面にピン留め
* タイマースキップ
* つまんで動かすのが楽

## Install

## Run application
### With file watch and livereload

```bash
# development config
NODE_ENV=development npm start

# production config
npm start
```

### Pre-packaging app

```bash
gulp build;electron dist
```

## Package application

```bash
gulp package
```

## Copy this boilerplate

```bash
gulp boilerplate -o {DIST_DIR}
```

## Directory structure

```
+ .serve/              Compiled files
+ dist/                Application for distribution
- release/             Packaged applications for platforms
 |+ darwin/
 |+ linux/
 |+ win32/
- src/                 Source directory
 |- assets/
  |+ images/
 |- browser/           For browser process scripts
  |+ menu/
 |- renderer/          For renderer process scripts and resources
  |+ components/       React components
  |  bootstrap.js      Entry point for render process
  |  index.html
 |- styles/            SCSS directory
  |  main.scss
 |  app.js             Entry point for browser process
  bower.json
  gulpfile.js
  package.json
```
