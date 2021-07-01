<template>
  <w-app>
    <div style="font-size: 24px; text-align: center">Connect To PA</div>
    <div style="margin: 16px">
      <w-select :items="comItems" label="COM Port" v-model="comPort">
      </w-select>
    </div>
    <div style="margin: 16px">
      <w-select :items="baudList" label="Baud" v-model="baud"> </w-select>
    </div>
    <w-button class="ma1" bg-color="primary">Connect</w-button>
  </w-app>
</template>

<script>
export default {
  data() {
    return {
      comItems: [
        { label: "COM1", value: "COM1" },
        { label: "COM2", value: "COM2" },
        { label: "COM3", value: "COM3" },
      ],
      comPort: null,
      baudList: [
        { label: "4800", value: 4800 },
        { label: "9600", value: 9600 },
      ],
      baud: null,
    };
  },
};
</script>

<style>
</style>