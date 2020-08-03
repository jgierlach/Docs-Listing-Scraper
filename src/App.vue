<template>
  <div id="app">
    <input v-model="partNumber" placeholder="Enter Part Number" />
    <button @click="scrapeDocs">Generate Listing</button>
    <br />
    <h1>
      {{partData.title}}
      <span>
        <CopyButton :copyText="partData.title" />
      </span>
    </h1>
    <h1>
      {{partData.price}}
      <span>
        <CopyButton :copyText="partData.price" />
      </span>
    </h1>
    <!-- <br /> -->
    <div class="center">
      <ul class="left width">
        <li>
          {{partData.firstBullet}}
          <span>
            <CopyButton :copyText="partData.firstBullet" />
          </span>
        </li>
        <li>
          {{partData.secondBullet}}
          <span>
            <CopyButton :copyText="partData.secondBullet" />
          </span>
        </li>
        <li>
          {{partData.thirdBullet}}
          <span>
            <CopyButton :copyText="partData.thirdBullet" />
          </span>
        </li>
        <li>
          {{partData.fourthBullet}}
          <span>
            <CopyButton :copyText="partData.fourthBullet" />
          </span>
        </li>
      </ul>
    </div>
    <div class="center">
      <p class="left width">
        <strong>Keywords:</strong>
        {{partData.keywords}}
        <span>
          <CopyButton :copyText="partData.price" />
        </span>
      </p>
    </div>
    <br />
    <img class="format-img" alt="docs image" :src="partData.img" />
  </div>
</template>

<script>
import axios from 'axios'
import CopyButton from './components/CopyButton.vue'

export default {
  name: 'App',
  components: {
    CopyButton,
  },
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
