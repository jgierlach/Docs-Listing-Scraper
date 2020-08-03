<template>
  <button
    class="copy-btn"
    @click="showCopied = !showCopied"
    v-clipboard:copy="copyText"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError"
  >
    <span v-if="!showCopied">Copy</span>
    <span v-if="showCopied">Copied!</span>
  </button>
</template>

<script>
export default {
  props: ['copyText'],
  data() {
    return {
      showCopied: false,
    }
  },
  methods: {
    onCopy() {
      console.log(`You copied ${this.copyText} to your clipboard`)
    },
    onError() {
      console.log(`You failed to copy ${this.copyText} to your clipboard`)
    },
  },
}
</script>

<style scoped>
.copy-btn {
  background: #6772e5;
  color: white;
  border: none;
  transition: all 0.5s ease;
  border-radius: 4px;
}

.copy-btn:hover {
  transition: all 0.5s ease;
  background: #424998;
}
</style>