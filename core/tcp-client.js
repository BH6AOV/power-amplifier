const net = require("net");
const { ipcMain } = require("electron");

let client;
let clientEstablish = false;

const parseError = error => {
  if (String(error).match(/ECONNREFUSED/g)) {
    clientEstablish = false;
    return { type: "connect", success: false, msg: " 目标地址被拒绝" };
  }
  return { type: "error", success: false, msg: String(error) };
};

const createClient = ({
  ip,
  port,
  initCallback,
  dataCallback,
  existCallback,
  closeCallback,
  errorCallback
}) => {
  if (clientEstablish) {
    existCallback();
    return;
  }
  client = new net.Socket();
  client.connect(port, ip, initCallback);
  client.on("data", data => {
    dataCallback(data);
  });
  client.on("close", function() {
    clientEstablish = false;
    closeCallback();
  });
  client.on("error", function(e) {
    errorCallback(e);
  });
};

ipcMain.on("connet-pa", (e, { ip, port }) => {
  createClient({
    ip,
    port,
    initCallback: () => {
      clientEstablish = true;
      e.reply("pa-status", { type: "connect", success: true });
    },
    dataCallback: data => {
      e.reply("pa-status", { type: "data", success: true, data });
    },
    closeCallback: () => {
      e.reply("pa-status", { type: "close", success: true });
    },
    existCallback: () => {
      e.reply("pa-status", {
        type: "connect",
        success: false,
        msg: "功放已连接"
      });
    },
    errorCallback: error => {
      e.reply("pa-status", parseError(error));
    }
  });
});
