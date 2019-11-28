<template>
  <div class="banner">
    <div class="banner-header">
      <h1>{{ headMsg }}</h1>
    </div>
    <div class="banner-body">
      <img width=60 height=90 src="imgSrc" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      msg: 'This is test page'
    }
  },
  props: {
    imgSrc: {
      type: String,
      default: '../../assets/logo/vue-logo.png'
    },
    headMsg: {
      type: String,
      default: 'Banner'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  width: 60px;
  height: 90px;
  border: solid 1px black;
  background-color: lightyellow;
  margin: 5px;
}
.banner-header {
  height: 15px;
  background-color: lightpink;
}
.banner-body {
  height: 60px;
  background-color: lightblue;
}
</style>