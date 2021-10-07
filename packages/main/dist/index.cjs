"use strict";
var require$$1 = require("electron");
var require$$1$1 = require("path");
require("url");
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
const isSingleInstance = require$$1.app.requestSingleInstanceLock();
if (!isSingleInstance) {
  require$$1.app.quit();
  process.exit(0);
}
require$$1.app.disableHardwareAcceleration();
{
  require$$1.app.whenReady().then(() => Promise.resolve().then(function() {
    return /* @__PURE__ */ _interopNamespace(require("electron-devtools-installer"));
  })).then(({ default: installExtension, VUEJS3_DEVTOOLS }) => installExtension(VUEJS3_DEVTOOLS, {
    loadExtensionOptions: {
      allowFileAccess: true
    }
  })).catch((e) => console.error("Failed install extension:", e));
}
let mainWindow = null;
const createWindow = async () => {
  mainWindow = new require$$1.BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nativeWindowOpen: true,
      preload: require$$1$1.join(__dirname, "../../preload/dist/index.cjs")
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
    {
      mainWindow?.webContents.openDevTools();
    }
  });
  const pageUrl = "http://localhost:3000/";
  await mainWindow.loadURL(pageUrl);
};
require$$1.app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized())
      mainWindow.restore();
    mainWindow.focus();
  }
});
require$$1.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    require$$1.app.quit();
  }
});
require$$1.app.whenReady().then(createWindow).catch((e) => console.error("Failed create window:", e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY2pzIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwLCBCcm93c2VyV2luZG93fSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQge2pvaW59IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtVUkx9IGZyb20gJ3VybCc7XG5cbmNvbnN0IGlzU2luZ2xlSW5zdGFuY2UgPSBhcHAucmVxdWVzdFNpbmdsZUluc3RhbmNlTG9jaygpO1xuXG5pZiAoIWlzU2luZ2xlSW5zdGFuY2UpIHtcbiAgYXBwLnF1aXQoKTtcbiAgcHJvY2Vzcy5leGl0KDApO1xufVxuXG5hcHAuZGlzYWJsZUhhcmR3YXJlQWNjZWxlcmF0aW9uKCk7XG5cbi8vIEluc3RhbGwgXCJWdWUuanMgZGV2dG9vbHNcIlxuaWYgKGltcG9ydC5tZXRhLmVudi5NT0RFID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIGFwcC53aGVuUmVhZHkoKVxuICAgIC50aGVuKCgpID0+IGltcG9ydCgnZWxlY3Ryb24tZGV2dG9vbHMtaW5zdGFsbGVyJykpXG4gICAgLnRoZW4oKHtkZWZhdWx0OiBpbnN0YWxsRXh0ZW5zaW9uLCBWVUVKUzNfREVWVE9PTFN9KSA9PiBpbnN0YWxsRXh0ZW5zaW9uKFZVRUpTM19ERVZUT09MUywge1xuICAgICAgbG9hZEV4dGVuc2lvbk9wdGlvbnM6IHtcbiAgICAgICAgYWxsb3dGaWxlQWNjZXNzOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSlcbiAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKCdGYWlsZWQgaW5zdGFsbCBleHRlbnNpb246JywgZSkpO1xufVxuXG5sZXQgbWFpbldpbmRvdzogQnJvd3NlcldpbmRvdyB8IG51bGwgPSBudWxsO1xuXG5jb25zdCBjcmVhdGVXaW5kb3cgPSBhc3luYyAoKSA9PiB7XG4gIG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgc2hvdzogZmFsc2UsIC8vIFVzZSAncmVhZHktdG8tc2hvdycgZXZlbnQgdG8gc2hvdyB3aW5kb3dcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxuICAgICAgbm9kZUludGVncmF0aW9uSW5Xb3JrZXI6IHRydWUsXG4gICAgICBuYXRpdmVXaW5kb3dPcGVuOiB0cnVlLFxuICAgICAgcHJlbG9hZDogam9pbihfX2Rpcm5hbWUsICcuLi8uLi9wcmVsb2FkL2Rpc3QvaW5kZXguY2pzJyksXG4gICAgfSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIElmIHlvdSBpbnN0YWxsIGBzaG93OiB0cnVlYCB0aGVuIGl0IGNhbiBjYXVzZSBpc3N1ZXMgd2hlbiB0cnlpbmcgdG8gY2xvc2UgdGhlIHdpbmRvdy5cbiAgICogVXNlIGBzaG93OiBmYWxzZWAgYW5kIGxpc3RlbmVyIGV2ZW50cyBgcmVhZHktdG8tc2hvd2AgdG8gZml4IHRoZXNlIGlzc3Vlcy5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24vZWxlY3Ryb24vaXNzdWVzLzI1MDEyXG4gICAqL1xuICBtYWluV2luZG93Lm9uKCdyZWFkeS10by1zaG93JywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3c/LnNob3coKTtcblxuICAgIGlmIChpbXBvcnQubWV0YS5lbnYuTU9ERSA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgbWFpbldpbmRvdz8ud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogVVJMIGZvciBtYWluIHdpbmRvdy5cbiAgICogVml0ZSBkZXYgc2VydmVyIGZvciBkZXZlbG9wbWVudC5cbiAgICogYGZpbGU6Ly8uLi9yZW5kZXJlci9pbmRleC5odG1sYCBmb3IgcHJvZHVjdGlvbiBhbmQgdGVzdFxuICAgKi9cbiAgY29uc3QgcGFnZVVybCA9IGltcG9ydC5tZXRhLmVudi5NT0RFID09PSAnZGV2ZWxvcG1lbnQnICYmIGltcG9ydC5tZXRhLmVudi5WSVRFX0RFVl9TRVJWRVJfVVJMICE9PSB1bmRlZmluZWRcbiAgICA/IGltcG9ydC5tZXRhLmVudi5WSVRFX0RFVl9TRVJWRVJfVVJMXG4gICAgOiBuZXcgVVJMKCcuLi9yZW5kZXJlci9kaXN0L2luZGV4Lmh0bWwnLCAnZmlsZTovLycgKyBfX2Rpcm5hbWUpLnRvU3RyaW5nKCk7XG5cblxuICBhd2FpdCBtYWluV2luZG93LmxvYWRVUkwocGFnZVVybCk7XG59O1xuXG5cbmFwcC5vbignc2Vjb25kLWluc3RhbmNlJywgKCkgPT4ge1xuICAvLyBTb21lb25lIHRyaWVkIHRvIHJ1biBhIHNlY29uZCBpbnN0YW5jZSwgd2Ugc2hvdWxkIGZvY3VzIG91ciB3aW5kb3cuXG4gIGlmIChtYWluV2luZG93KSB7XG4gICAgaWYgKG1haW5XaW5kb3cuaXNNaW5pbWl6ZWQoKSkgbWFpbldpbmRvdy5yZXN0b3JlKCk7XG4gICAgbWFpbldpbmRvdy5mb2N1cygpO1xuICB9XG59KTtcblxuXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge1xuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcbiAgICBhcHAucXVpdCgpO1xuICB9XG59KTtcblxuXG5hcHAud2hlblJlYWR5KClcbiAgLnRoZW4oY3JlYXRlV2luZG93KVxuICAuY2F0Y2goKGUpID0+IGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCBjcmVhdGUgd2luZG93OicsIGUpKTtcblxuXG4vLyBBdXRvLXVwZGF0ZXNcbmlmIChpbXBvcnQubWV0YS5lbnYuUFJPRCkge1xuICBhcHAud2hlblJlYWR5KClcbiAgICAudGhlbigoKSA9PiBpbXBvcnQoJ2VsZWN0cm9uLXVwZGF0ZXInKSlcbiAgICAudGhlbigoe2F1dG9VcGRhdGVyfSkgPT4gYXV0b1VwZGF0ZXIuY2hlY2tGb3JVcGRhdGVzQW5kTm90aWZ5KCkpXG4gICAgLmNhdGNoKChlKSA9PiBjb25zb2xlLmVycm9yKCdGYWlsZWQgY2hlY2sgdXBkYXRlczonLCBlKSk7XG59XG5cbiJdLCJuYW1lcyI6WyJhcHAiLCJCcm93c2VyV2luZG93Iiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsTUFBTSxtQkFBbUJBLGVBQUk7QUFFN0IsSUFBSSxDQUFDLGtCQUFrQjtpQkFDakI7VUFDSSxLQUFLO0FBQUE7QUFHZkEsZUFBSTtBQUd3QztpQkFDdEMsWUFDRCxLQUFLLE1BQU07cURBQU87QUFBQSxNQUNsQixLQUFLLENBQUMsRUFBQyxTQUFTLGtCQUFrQixzQkFBcUIsaUJBQWlCLGlCQUFpQjtBQUFBLElBQ3hGLHNCQUFzQjtBQUFBLE1BQ3BCLGlCQUFpQjtBQUFBO0FBQUEsTUFHcEIsTUFBTSxPQUFLLFFBQVEsTUFBTSw2QkFBNkI7QUFBQTtBQUczRCxJQUFJLGFBQW1DO0FBRXZDLE1BQU0sZUFBZSxZQUFZO2VBQ2xCLElBQUlDLHlCQUFjO0FBQUEsSUFDN0IsTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsTUFDZCxpQkFBaUI7QUFBQSxNQUNqQix5QkFBeUI7QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxNQUNsQixTQUFTQyxrQkFBSyxXQUFXO0FBQUE7QUFBQTthQVVsQixHQUFHLGlCQUFpQixNQUFNO2dCQUN2QjtBQUVnQztrQkFDOUIsWUFBWTtBQUFBO0FBQUE7UUFTdEIsVUFDRjtRQUlFLFdBQVcsUUFBUTtBQUFBO0FBSTNCRixlQUFJLEdBQUcsbUJBQW1CLE1BQU07TUFFMUIsWUFBWTtRQUNWLFdBQVc7aUJBQTBCO2VBQzlCO0FBQUE7QUFBQTtBQUtmQSxlQUFJLEdBQUcscUJBQXFCLE1BQU07TUFDNUIsUUFBUSxhQUFhLFVBQVU7bUJBQzdCO0FBQUE7QUFBQTtBQUtSQSxlQUFJLFlBQ0QsS0FBSyxjQUNMLE1BQU0sQ0FBQyxNQUFNLFFBQVEsTUFBTSx5QkFBeUI7In0=
