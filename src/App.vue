<template>
  <div id="app">
    <input v-model="partNumber" placeholder="Enter Part Number" />
    <button class="generate-listing-btn" @click="scrapeDocs">Generate Listing</button>
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
          <CopyButton :copyText="partData.keywords" />
        </span>
      </p>
    </div>
    <a :href="partData.img" target="_blank">
      <button class="generate-img">Generate Full Image</button>
    </a>
    <br />
    <!-- <img class="format-img" alt="docs image" :src="partData.img" /> -->
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
body {
  background: #0e2439;
  color: #9cb3c9;
}

input {
  background: #1c4871;
  border: none;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
}

input::placeholder {
  color: white;
}

.generate-listing-btn {
  background: #6772e5;
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
}

.generate-listing-btn:hover {
  transition: all 0.5s ease;
  background: #424998;
}

.generate-img {
  color: #fff;
  background: #6772e5;
  padding: 1rem;
  transition: all 0.15s ease;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: none;
}

.generate-img:hover {
  transition: all 0.5s ease;
  background: #424998;
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
  margin-top: 60px;
}
</style>
