<template>
  <div id="app">
    <h1>🤦‍♀️🎉💁‍♂️</h1>
    <h2>Turn your avatar into a party emoji</h2>
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #39143e;
  height: 100%;
  color: #fff;
  padding-top: 60px;
}

h1 {
  font-size: 60px;
  letter-spacing: 10px;
  animation: party 2s infinite step-start;
}

h2 {
  margin-bottom: 30px;
}

@keyframes party {
  0% {
    filter: hue-rotate(0);
  }

  20% {
    filter: hue-rotate(80deg);
  }

  40% {
    filter: hue-rotate(200deg);
  }

  60% {
    filter: hue-rotate(310deg);
  }

  80% {
    filter: hue-rotate(630deg);
  }
}
</style>
