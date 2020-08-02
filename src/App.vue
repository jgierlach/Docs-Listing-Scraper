<template>
  <div id="app">
    <input v-model="partNumber" placeholder="Enter Part Number" />
    <button @click="scrapeDocs">Generate Listing</button>
    <br />
    <h1>{{partData.title}}</h1>
    <!-- <br /> -->
    <div class="center">
      <ul class="left width">
        <li>{{partData.firstBullet}}</li>
        <li>{{partData.secondBullet}}</li>
        <li>{{partData.thirdBullet}}</li>
        <li>{{partData.fourthBullet}}</li>
      </ul>
    </div>
    <div class="center">
      <p class="left width">
        <strong>keywords:</strong>
        {{partData.keywords}}
      </p>
    </div>
    <br />
    <img class="format-img" alt="docs image" :src="partData.img" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      partData: {},
      partNumber: '',
    }
  },
  methods: {
    async scrapeDocs() {
      const response = await axios.get(
        `/api/generate/ujoint/${this.partNumber}`
      )
      console.log('response', response)
      this.partData = response.data
    },
  },
}
</script>

<style>
.format-img {
  width: 1000px;
  height: 1000px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  text-align: left;
}

.width {
  width: 500px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
