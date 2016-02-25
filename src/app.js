'use strict';
require('babel/polyfill');

import app from 'app';
import BrowserWindow from 'browser-window';
import crashReporter from 'crash-reporter';
import Menu from 'menu';
import appMenu from './browser/menu/appMenu';

let mainWindow = null;
if(process.env.NODE_ENV === 'development'){
  crashReporter.start();
  //appMenu.append(devMenu);
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  //Menu.setApplicationMenu(appMenu);
  mainWindow = new BrowserWindow({
    width: 291,
    height: 70,
    transparent: true,
    frame: false
  });
  mainWindow.setResizable(false);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.loadUrl('file://' + __dirname + '/renderer/index.html');
});
