<template>
  <button
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

<style>
</style>