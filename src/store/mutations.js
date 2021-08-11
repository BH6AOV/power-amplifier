export default {
  UPDATE_LINK_STATUS(state, data) {
    state.linkStatus = data;
  },
  UPDATE_LINK_TYPE(state, data) {
    state.linkType = data;
  },
  UPDATE_LINK_MSG(state, data) {
    state.linkMsg = data;
  },
  UPDATE_LINK_EXTRA(state, data) {
    state.linkExtraInfo = data;
  },
  UPDATE_PA_INFO(state, { power, standingWave, band, status, reflect }) {
    state.power = power;
    state.standingWave = standingWave;
    state.band = band;
    state.status = status;
    state.reflect = reflect;
  },
  _DEBUG_UPDATE_POWER(state, data) {
    state.power = data;
  },
  _DEBUG_UPDATE(state, { standingWave, reflect }) {
    state.standingWave = standingWave;
    state.reflect = reflect;
  }
};
