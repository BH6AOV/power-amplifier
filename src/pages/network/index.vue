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
  },
};
</script>

<style>
</style>