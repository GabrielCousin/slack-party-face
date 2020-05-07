<template>
  <div>
    <canvas ref="canvas" hidden></canvas>
    <div v-if="resultSrc">
      <a :href="resultSrc" download="party.gif">
        <img :src="resultSrc" />
        <p>Download</p>
      </a>
    </div>
    <div v-else>
      <input type="file" accept="image/*" @change="onFileAdded" />
    </div>
  </div>
</template>

<script>
import GIF from 'gif.js';

export default {
  name: 'Main',
  data() {
    return {
      fileReader: new FileReader(),
      image: new Image(),
      resultSrc: null,
      gif: new GIF({
        workers: 2,
        workerScript: '/gif.worker.js',
        quality: 10,
        width: 256,
        height: 256
      })
    };
  },
  props: {
    msg: String
  },
  methods: {
    draw() {
      const ctx = this.$refs.canvas.getContext('2d');

      [80, 200, 310, 630].forEach(hue => {
        ctx.canvas.width = 256;
        ctx.canvas.height = 256;
        ctx.filter = `saturate(250%) hue-rotate(${hue}deg) brightness(110%)`;
        ctx.drawImage(
          this.image,
          0,
          0,
          256 || ctx.canvas.width,
          256 || ctx.canvas.height
        );

        this.gif.addFrame(ctx, { copy: true, delay: 200 });
      });

      this.gif.on('finished', (blob) => {
        this.resultSrc = URL.createObjectURL(blob)
      });

      this.gif.render();
    },
    onFileAdded(event) {
      const [imageFile] = event.target.files;

      this.image.onload = this.draw;

      this.fileReader.onloadend = () => {
        this.image.src = this.fileReader.result;
      }

      this.fileReader.readAsDataURL(imageFile);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #fff;
}
</style>
