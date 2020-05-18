<template>
  <main>
    <canvas ref="canvas" hidden></canvas>
    <div v-if="isLoading">
      Processing…
    </div>
    <div v-else-if="resultSrc">
      <a :href="resultSrc" download="party.gif">
        <img :src="resultSrc" />
        <div class="action">Download</div>
      </a>
    </div>
    <div v-else>
      <h2>Create your party-emoji</h2>
      <div
        class="dropzone"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
        Drop a file
      </div>
      <label class="action">
        Add image
        <input type="file" accept="image/jpeg,image/png" hidden @change="onFileAdded" />
      </label>
    </div>
  </main>
</template>

<script>
import GIF from 'gif.js';

const GIF_SIZE = 256;

export default {
  name: 'Main',
  data() {
    return {
      fileReader: new FileReader(),
      image: new Image(),
      resultSrc: null,
      isLoading: false,
      gif: new GIF({
        workers: 2,
        workerScript: '/gif.worker.js',
        quality: 10,
        width: GIF_SIZE,
        height: GIF_SIZE,
        transparent: '#ffffff'
      })
    };
  },
  props: {
    msg: String
  },
  methods: {
    onDrop(e) {
      const { files } = e.dataTransfer;

      if(!files) {
        return;
      }

      const [file] = files;

      if (['image/jpeg', 'image/png'].includes(file.type)) {
        this.readFile(file);
      }
    },
    draw() {
      const ctx = this.$refs.canvas.getContext('2d');
      const {
        offsetX,
        offsetY,
        width,
        height
      } = this.getImageOptions(this.image);

      [80, 200, 310, 630].forEach(hue => {
        ctx.canvas.width = GIF_SIZE;
        ctx.canvas.height = GIF_SIZE;
        ctx.filter = `sepia(1) saturate(5) brightness(.9) hue-rotate(${hue}deg)`;
        ctx.drawImage(
          this.image,
          offsetX,
          offsetY,
          width || ctx.canvas.width,
          height || ctx.canvas.height
        );

        this.gif.addFrame(ctx, { copy: true, delay: 200 });
      });

      this.gif.on('finished', (blob) => {
        this.resultSrc = URL.createObjectURL(blob);
        this.isLoading = false;
      });

      this.gif.render();
    },
    getImageOptions(image) {
      const { width, height } = image;

      if (width > height) {
        const targetHeight = Math.floor(height * GIF_SIZE / width);
        const targetOffsetY = Math.floor((GIF_SIZE - targetHeight) / 2);

        return {
          offsetX: 0,
          offsetY: targetOffsetY,
          width: GIF_SIZE,
          height: targetHeight
        }
      }

      if (width < height) {
        const targetWidth = Math.floor(width * GIF_SIZE / height);
        const targetOffsetX = Math.floor((GIF_SIZE - targetWidth) / 2);

        return {
          offsetX: targetOffsetX,
          offsetY: 0,
          width: targetWidth,
          height: GIF_SIZE
        }
      }

      return {
        offsetX: 0,
        offsetY: 0,
        width: GIF_SIZE,
        height: GIF_SIZE
      }

    },
    readFile(imageFile) {
      this.isLoading = true;
      this.image.onload = this.draw;

      this.fileReader.onloadend = () => {
        this.image.src = this.fileReader.result;
      }

      this.fileReader.readAsDataURL(imageFile);
    },
    onFileAdded(event) {
      const [imageFile] = event.target.files;
      this.readFile(imageFile);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding-bottom: 30px;
}

img {
  display: block;
  width: 256px;
  margin: 0 auto;
}

h2 {
  max-width: 500px;
  font-size: 30px;
  line-height: 36px;
  text-transform: uppercase;
  margin: 0 auto 60px;
}

a {
  color: #fff;
}
.dropzone {
  margin: 0 auto;
  padding: 10px 15px;
  text-align: left;
  border: 4px dashed #fff;
  width: 320px;
  height: 320px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.action {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 12px 40px;
  display: inline-block;
  margin: 30px 0 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  transition: all .3s;
  color: #fff;
  border: 4px solid #fff;
  border-radius: 25px;
  text-decoration: none;
}

.action:hover {
  color: #39143e;
  background-color: #fff;
}
</style>
