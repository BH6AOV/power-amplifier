import { createStore } from "vuex";
import mutations from "./mutations";
import { linkStateEnum, linkTypeEnum } from "../contants";
const ipcRenderer = window.electron.ipcRenderer;

const store = createStore({
  state() {
    return {
      /** 功放基础信息 */
      power: 1200,
      standingWave: 1.4,
      band: 15,
      status: 1,
      reflect: 100,
      /** 功放连接信息 */
      linkState: 0,
      linkType: linkTypeEnum.unestablished,
      linkMsg: "",
      linkExtraInfo: {}
    };
  },
  mutations
});

ipcRenderer.on("pa-status", (_, paStatus) => {
  const { type, success, msg = "", data = "" } = paStatus;
  if (type === "connect" && success === true) {
    store.commit("UPDATE_LINK_STATUS", linkStateEnum.established);
    store.commit("UPDATE_LINK_TYPE", linkTypeEnum.established);
  } else if (type === "data" && success === true) {
    if (
      store.state.linkState !== linkStateEnum.established ||
      store.state.linkType !== linkTypeEnum.established
    ) {
      store.commit("UPDATE_LINK_STATUS", linkStateEnum.established);
      store.commit("UPDATE_LINK_TYPE", linkTypeEnum.established);
    }
    try {
      const dataObj = JSON.parse(data);
      const { power, standingWave, band, status, reflect } = dataObj;
      store.commit("UPDATE_PA_INFO", {
        power,
        standingWave,
        band,
        status,
        reflect
      });
    } catch (e) {
      store.commit("UPDATE_LINK_STATUS", linkStateEnum.unestablished);
      store.commit("UPDATE_LINK_TYPE", linkTypeEnum.error);
    }
  } else if (type === "connect" && success === false) {
    store.commit("UPDATE_LINK_STATUS", linkStateEnum.unestablished);
    store.commit("UPDATE_LINK_TYPE", linkTypeEnum.linkFail);
    store.commit("UPDATE_LINK_MSG", msg);
  } else if (type === "close" && success === true) {
    store.commit("UPDATE_LINK_STATUS", linkStateEnum.unestablished);
    store.commit("UPDATE_LINK_STATUS", linkTypeEnum.lossLink);
  } else {
    console.log("1");
  }
});

export default store;
