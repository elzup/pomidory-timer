'use strict';
require('babel/polyfill');

import app from 'app';
import BrowserWindow from 'browser-window';
import crashReporter from 'crash-reporter';
import Tray from 'tray';
import Menu from 'menu';
import MenuItem from 'menu-item';
import appMenu from './browser/menu/appMenu';

let mainWindow = null;
let appIcon = null;
if (process.env.NODE_ENV === 'development') {
  crashReporter.start();
  // appMenu.append(devMenu);
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 291,
    height: 70,
    transparent: true,
    frame: false
  });
  mainWindow.setResizable(false);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.loadURL('file://' + __dirname + '/renderer/index.html');

  // TODO: only darwin -> support other os
  appMenu.append(
    new MenuItem({
      label: 'View',
      submenu: [{
        label: 'Reset',
        accelerator: 'Command+R',
        click: function () {
          mainWindow.restart();
        }
      }, {
        label: 'Fixed',
        click: function () {
          mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
        }
      }]
    }));

  // メニューアイコン設定
  appIcon = new Tray(__dirname + '/assets/images/icon-tray.png');
  // アイコンにマウスオーバーした時の説明
  appIcon.setToolTip('This is sample.');

  Menu.setApplicationMenu(appMenu);
  appIcon.setContextMenu(appMenu);
});

// module.exports = mainWindow;
