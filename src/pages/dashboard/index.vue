<template>
  <div class="dashboard">
    <div class="title">IZUMO PA</div>
    <div class="power-info">
      <div class="power-info-left">Power:</div>
      <div class="power-info-right">{{ power }} Watt</div>
    </div>
    <div class="power-line-info">
      <div class="power-line-info-left">0 Watt</div>
      <div class="power-line-center">
        <div
          v-for="i in getPowerItem"
          :key="i"
          :class="{
            'power-item': true,
            'power-item-red': isPowerItemColorRed(i),
            'power-item-green': !isPowerItemColorRed(i),
          }"
        ></div>
      </div>
      <div class="power-line-info-right">1200 Watt</div>
    </div>
    <div class="standing-wave-info">
      <div class="standing-wave-info-left">SWR:</div>
      <div class="standing-wave-info-right">{{ standingWave }}</div>
    </div>
    <div class="band-info">
      <div class="band-info-left">Band:</div>
      <div class="band-info-right">{{ band }} Meter</div>
    </div>
    <div class="status-info">
      <div class="status-info-left">Status:</div>
      <div class="status-info-right">
        {{ getStatus }}
        <div :class="getStatusClass"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      power: 654,
      standingWave: 1.3,
      band: 15,
      status: 1,
    };
  },
  computed: {
    getPowerItem() {
      return Number((this.power / 40).toFixed(0));
    },
    getStatus() {
      if (this.status === 1) {
        return "OPR";
      } else if (this.status === 0) {
        return "STBY";
      } else {
        return "UNKNOW";
      }
    },
    getStatusClass() {
      if (this.status === 1) {
        return "status-icon-green";
      } else if (this.status === 0) {
        return "status-icon-red";
      } else {
        return "";
      }
    },
  },
  methods: {
    isPowerItemColorRed(i) {
      return i > 25;
    },
    decimal(num, v) {
      const vv = Math.pow(10, v);
      return Math.round(num * vv) / vv;
    },
  },
};
</script>

<style>
.dashboard {
  width: 640px;
  height: 320px;
  background: rgba(0, 0, 0, 0.025);
}

.title {
  width: 100%;
  text-align: center;
  font-size: 32px;
}

.power-info {
  margin-top: 16px;
  width: 640px;
  display: flex;
}
.power-info-left {
  text-align: center;
  width: 100px;
  padding-right: 4px;
  padding-left: 4px;
}
.power-info-right {
  width: 540px;
  padding-right: 4px;
  padding-left: 4px;
}

.power-line-info {
  margin-top: 16px;
  width: 640px;
  display: flex;
}
.power-line-info-left {
  text-align: center;
  width: 100px;
  padding-right: 4px;
  padding-left: 4px;
}
.power-line-info-right {
  text-align: center;
  width: 120px;
  padding-left: 4px;
  padding-right: 4px;
}

.power-line-center {
  width: 420px;
  display: flex;
}
.power-item {
  width: 12px;
  height: 20px;
  margin-left: 2px;
}
.power-item-red {
  background: red;
}
.power-item-green {
  background: greenyellow;
}

.standing-wave-info {
  margin-top: 16px;
  width: 640px;
  display: flex;
}
.standing-wave-info-left {
  text-align: center;
  width: 100px;
  padding-right: 4px;
  padding-left: 4px;
}
.standing-wave-info-right {
  width: 540px;
  padding-right: 4px;
  padding-left: 4px;
}

.band-info {
  margin-top: 16px;
  width: 640px;
  display: flex;
}
.band-info-left {
  text-align: center;
  width: 100px;
  padding-right: 4px;
  padding-left: 4px;
}
.band-info-right {
  width: 540px;
  padding-right: 4px;
  padding-left: 4px;
}

.status-info {
  margin-top: 16px;
  width: 640px;
  display: flex;
}
.status-info-left {
  text-align: center;
  width: 100px;
  padding-right: 4px;
  padding-left: 4px;
}
.status-info-right {
  position: relative;
  width: 540px;
  padding-right: 4px;
  padding-left: 4px;
}

.status-icon-red {
  position: absolute;
  top: 2px;
  left: 48px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: red;
}

.status-icon-green {
  position: absolute;
  top: 2px;
  left: 48px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: green;
}
</style>