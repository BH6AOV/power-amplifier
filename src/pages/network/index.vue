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
import { mapState } from "vuex";
import { linkTypeEnum } from "../../contants";
const ipcRenderer = window.electron.ipcRenderer;

export default {
  data() {
    return {
      ip: null,
      port: null,
      ready: false,
    };
  },
  computed: {
    ...mapState(["linkType", "linkMsg", "linkExtraInfo"]),
  },
  watch: {
    linkType() {
      switch (this.linkType) {
        case linkTypeEnum.established: {
          this.$waveui.notify("连接成功", "success", 3000);
          this.$router.push("/home");
          break;
        }
        case linkTypeEnum.linkFail: {
          this.$waveui.notify("连接失败" + this.linkMsg, "error", 3000);
          break;
        }
        case linkTypeEnum.lossLink: {
          this.$waveui.notify("连接丢失", "info", 3000);
          break;
        }
        default: {
          break;
        }
      }
    },
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