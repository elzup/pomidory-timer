'use strict';
require('babel/polyfill');

import app from 'app';
import BrowserWindow from 'browser-window';
import crashReporter from 'crash-reporter';
import appMenu from './browser/menu/appMenu';
import Tray from 'tray';
import Menu from 'menu';

let mainWindow = null;
let appIcon = null;
if(process.env.NODE_ENV === 'development'){
  crashReporter.start();
  // appMenu.append(devMenu);
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  // Menu.setApplicationMenu(appMenu);
  mainWindow = new BrowserWindow({
    width: 291,
    height: 70,
    transparent: true,
    frame: false
  });
  mainWindow.setResizable(false);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.loadUrl('file://' + __dirname + '/renderer/index.html');


  var contextMenu = Menu.buildFromTemplate([
    {label: '選択メニュー1', type: 'radio'},
    {label: '選択メニュー2', type: 'radio'},
    {type: 'separator'},
    {label: 'サブメニュー', submenu: [
      {label: 'サブメニュー1'},
      {label: 'サブメニュー2'}
    ]},
    {label: '終了', accelerator: 'Command+Q', click: function() { app.quit(); }}
  ]);
  // メニューアイコン設定
  // appIcon = new Tray(null);
  appIcon = new Tray(__dirname + '/assets/images/icon-tray.png');
  appIcon.setContextMenu(contextMenu);
  // アイコンにマウスオーバーした時の説明
  appIcon.setToolTip('This is sample.');

});
