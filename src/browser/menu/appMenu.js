'use strict';

import {app} from 'electron';
export const MenuConfig = [
  {
    label: 'Pomidory Timer',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () {app.quit()}
      }
    ]
  }
];
//
// let appMenu = Menu.buildFromTemplate(template);
//
// module.exports = appMenu;
