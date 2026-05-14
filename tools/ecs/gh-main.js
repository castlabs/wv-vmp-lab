// Copyright 2026 Castlabs, GmbH
// SPDX-License-Identifier: Apache-2.0

const {app, components, BrowserWindow} = require('electron');

app.whenReady().then(async () => {
  await components.whenReady();
  console.log('components ready:', components.status());
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
  });
  mainWindow.loadURL('https://castlabs.github.io/wv-vmp-lab/');
});
