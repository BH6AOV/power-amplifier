<template>
  <router-view />
</template>

<script>
import { mapState } from "vuex";
import { linkTypeEnum } from "./contants";
export default {
  name: "App",
  computed: {
    ...mapState(["linkState", "linkType", "linkMsg", "linkExtraInfo"]),
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
  created() {
    if (this.linkState === 0) {
      this.$router.push("/net");
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
