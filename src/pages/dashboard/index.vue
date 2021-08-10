<template>
  <div class="dashboard">
    <div class="title">IZUMO PA</div>
    <!-- 功率计 -->
    <div class="power-line-info">
      <div class="power-line-info-left">Power:</div>
      <div class="power-line-center">
        <div
          v-for="i in getPowerItem"
          :key="i"
          :class="{
            'led-item': true,
            'led-item-red': isPowerItemColorRed(i),
            'led-item-green': !isPowerItemColorRed(i),
          }"
        ></div>
        <div
          v-for="j in getFreePowerItem"
          :key="j"
          class="led-item led-item-gray"
        ></div>
      </div>
      <div class="power-line-info-right">
        <span style="font-weight: bolder">{{ power }}</span> Watt
      </div>
    </div>
    <div class="power-meter">
      <div class="meter-item power-meter-zero">0</div>
      <div class="meter-item power-meter-five-hundred">0.5</div>
      <div class="meter-item power-meter-one-thousand">1</div>
      <div class="meter-item power-meter-twelve-hundred">1.2</div>
    </div>
    <!-- 驻波表 -->
    <div class="standing-wave-info">
      <div class="standing-wave-info-left">SWR:</div>
      <div class="standing-wave-info-center">
        <div
          v-for="i in getStandingWave"
          :key="i"
          :class="{
            'led-item': true,
            'led-item-red': isStandingWaveItemColorRed(i),
            'led-item-green': !isStandingWaveItemColorRed(i),
          }"
        ></div>
        <div
          v-for="j in getFreeStandingWave"
          :key="j"
          class="led-item led-item-gray"
        ></div>
      </div>
      <div class="standing-wave-info-data" :style="protect ? 'color: red' : ''">
        {{ standingWave }}
      </div>
      <div v-if="protect" class="standing-wave-info-protect-status">
        <div class="protect-status-icon"></div>
        <span style="color: red; font-weight: bold">Protect</span>
      </div>
      <div v-else class="standing-wave-info-protect-status"></div>
      <div class="standing-wave-info-reflect">Reflect:</div>
      <div class="standing-wave-info-reflect-data">
        <span style="font-weight: bolder">{{ reflect }}</span> Watt
      </div>
    </div>
    <div class="standing-wave-meter">
      <div class="meter-item standing-wave-meter-one">1</div>
      <div class="meter-item standing-wave-meter-two">2</div>
      <div class="meter-item standing-wave-meter-three">3</div>
      <div class="meter-item standing-wave-meter-top">∞</div>
    </div>
    <!-- 波段表 -->
    <div class="band-info">
      <div class="band-info-left">Band:</div>
      <div class="band-info-right">
        <span style="font-weight: bolder">{{ band }}</span> Meter
      </div>
    </div>
    <!-- 功放状态 -->
    <div class="status-info">
      <div class="status-info-left">Status:</div>
      <div class="status-info-right">
        <span style="font-weight: bolder">{{ getStatus }}</span>
        <div :class="getStatusClass"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      power: 1200,
      standingWave: 1.4,
      band: 15,
      status: 1,
      reflect: 100,
    };
  },
  computed: {
    getFreePowerItem() {
      return Number((30 - this.getPowerItem).toFixed(0));
    },
    getPowerItem() {
      return Number((this.power / 40).toFixed(0));
    },
    getStandingWave() {
      const intStandingWave = this.standingWave * 10;
      if (intStandingWave < 10) {
        return 0;
      }
      if (intStandingWave > 10 && intStandingWave <= 20) {
        return Number(((intStandingWave - 10) / 2).toFixed(0));
      }
      if (intStandingWave > 20 && intStandingWave <= 30) {
        return 5 + Number(((intStandingWave - 20) / 3).toFixed(0));
      }
      if (intStandingWave > 30 && intStandingWave <= 35) {
        return 9;
      }
      return 10;
    },
    getFreeStandingWave() {
      return Number((10 - this.getStandingWave).toFixed(0));
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
    protect() {
      return this.getStandingWave > 5;
    },
  },
  methods: {
    isPowerItemColorRed(i) {
      return i > 25;
    },
    isStandingWaveItemColorRed() {
      return this.getStandingWave > 5;
    },
    decimal(num, v) {
      const vv = Math.pow(10, v);
      return Math.round(num * vv) / vv;
    },
  },
  created() {
    /* DEBUG_START */
    function getRandom(n, m) {
      var num = Math.floor(Math.random() * (m - n + 1) + n);
      return num;
    }
    function getFloatRandom(n, m) {
      return (Math.random() * (n - m) + m).toFixed(1);
    }
    setInterval(() => {
      this.power = getRandom(800, 1150);
    }, "100");
    setInterval(() => {
      this.standingWave = getFloatRandom(1, 4.8);
      this.reflect = getRandom(10, 120);
    }, "500");
    console.log(this.getStandingWave);
    /* DEBUG_END */
  },
};
</script>

<style>
.dashboard {
  width: 640px;
  height: 320px;
  padding-top: 16px;
  background: rgba(0, 0, 0, 0.025);
}

.title {
  width: 100%;
  text-align: center;
  font-size: 32px;
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
  text-align: right;
  width: 90px;
  padding-left: 4px;
  padding-right: 4px;
}

.power-line-center {
  width: 422px;
  display: flex;
  height: 24px;
  background: rgb(211, 211, 211);
}
.led-item {
  width: 12px;
  height: 20px;
  margin-top: 2px;
  margin-left: 2px;
}
.led-item-red {
  background: red;
}
.led-item-green {
  background: greenyellow;
}
.led-item-gray {
  background: snow;
}

.power-meter {
  margin-top: 4px;
  width: 640px;
  height: 24px;
  position: relative;
}
.meter-item {
  color: rgb(182, 182, 182);
  font-weight: bold;
  position: absolute;
}
.power-meter-zero {
  left: 105px;
}
.power-meter-five-hundred {
  left: 280px;
}
.power-meter-one-thousand {
  left: 455px;
}
.power-meter-twelve-hundred {
  left: 518px;
}
.standing-wave-info {
  margin-top: 8px;
  width: 640px;
  display: flex;
}
.standing-wave-info-left {
  text-align: center;
  width: 100px;
  padding-right: 4px;
  padding-left: 4px;
}
.standing-wave-info-center {
  width: 142px;
  display: flex;
  height: 24px;
  background: rgb(211, 211, 211);
}

.standing-wave-info-data {
  width: 40px;
  font-weight: bold;
  padding-right: 4px;
  padding-left: 16px;
}
.standing-wave-info-protect-status {
  position: relative;
  width: 80px;
  padding-right: 4px;
  padding-left: 12px;
}
.protect-status-icon {
  position: absolute;
  top: 2px;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: red;
}

.standing-wave-info-reflect {
  width: 140px;
  text-align: right;
}
.standing-wave-info-reflect-data {
  width: 80px;
  text-align: right;
}

.standing-wave-meter {
  margin-top: 4px;
  width: 640px;
  height: 24px;
  position: relative;
}
.standing-wave-meter-one {
  left: 105px;
}
.standing-wave-meter-two {
  left: 175px;
}
.standing-wave-meter-three {
  left: 216px;
}
.standing-wave-meter-top {
  left: 244px;
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