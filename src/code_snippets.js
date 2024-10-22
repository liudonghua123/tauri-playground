export const codeSnippets = {
  http: {
    title: 'HTTP Client by @tauri-apps/plugin-http',
    link: 'https://tauri.app/plugin/http-client/',
    code: `
import { fetch } from '@tauri-apps/plugin-http';

// Send a GET request
const response = await fetch('http://test.tauri.app/data.json', {
  method: 'GET',
});
console.log(response.status); // e.g. 200
console.log(response.statusText); // e.g. "OK"
  `
  },
  notification: {
    title: 'Notifications by @tauri-apps/plugin-notification',
    link: 'https://tauri.app/plugin/notification/',
    code: `
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';
// when using '"withGlobalTauri": true', you may use
// const { isPermissionGranted, requestPermission, sendNotification, } = window.__TAURI__.notification;

// Do you have permission to send a notification?
let permissionGranted = await isPermissionGranted();

// If not we need to request it
if (!permissionGranted) {
  const permission = await requestPermission();
  permissionGranted = permission === 'granted';
}

// Once permission has been granted we can send the notification
if (permissionGranted) {
  sendNotification({ title: 'Tauri', body: 'Tauri is awesome!' });
}
  `
  },
  dialog: {
    title: 'Dialog by @tauri-apps/plugin-dialog',
    link: 'https://tauri.app/plugin/dialog/',
    code: `
import { ask } from '@tauri-apps/plugin-dialog';
// when using ';"withGlobalTauri": true';, you may use
// const { ask } = window.__TAURI__.dialog;

// Create a Yes/No dialog
const answer = await ask('This action cannot be reverted. Are you sure?', {
  title: 'Tauri',
  kind: 'warning',
});

console.log(answer);
// Prints boolean to the console
`
  },
  fs: {
    title: 'Filesystem by @tauri-apps/plugin-fs',
    link: 'https://tauri.app/plugin/filesystem/',
    code: `
import { exists, BaseDirectory } from '@tauri-apps/plugin-fs';
// when using '"withGlobalTauri": true', you may use
// const { exists, BaseDirectory } = window.__TAURI__.fs;

// Check if the '$APPDATA/avatar.png' file exists
await exists('avatar.png', { baseDir: BaseDirectory.AppData });
`
  }
};