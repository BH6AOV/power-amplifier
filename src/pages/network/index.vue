<template>
  <w-app>
    <div style="font-size: 24px; text-align: center">Connect To PA</div>
    <div style="margin: 16px">
      <w-input class="mb4" label="IP" v-model="ip"> </w-input>
    </div>
    <div style="margin: 16px">
      <w-input class="mb4" label="PORT" v-model="port"> </w-input>
    </div>
    <w-button class="ma1" bg-color="primary" @click="connect">Connect</w-button>
  </w-app>
</template>

<script>
const ipcRenderer = window.electron.ipcRenderer;

export default {
  data() {
    return {
      ip: null,
      port: null,
      ready: false,
    };
  },
  methods: {
    connect() {
      if (this.ready) {
        ipcRenderer.send("connet-pa", { ip: this.ip, port: Number(this.port) });
      }
    },
  },
  mounted() {
    this.ready = true;
    ipcRenderer.on("pa-status", (_, paStatus) => {
      const { type, success, msg = "", data } = paStatus;
      if (type === "connect" && success === true) {
        this.$waveui.notify("连接成功", "success", 3000);
      } else if (type === "connect" && success === false) {
        this.$waveui.notify("连接失败" + msg, "error", 3000);
      } else if (type === "close" && success === true) {
        this.$waveui.notify("连接丢失", "info", 3000);
      } else {
        console.log(data);
      }
    });
  },
};
</script>

<style>
</style>