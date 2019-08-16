<template>
  <div
    :style="{ zIndex: zIndex, height: height, width: width }"
    class="pan-item"
  >
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <div :style="{ backgroundImage: `url(${image})` }" class="pan-thumb"></div>
  </div>
</template>

<script>
import backgroundUrl from '@/assets/avatar.jpg'

export default {
  name: 'BlogAvatar',
  props: {
    image: {
      type: String,
      required: false,
      default: backgroundUrl
    },
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '150px'
    }
  }
}
</script>

<style lang="scss" scoped>
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: default;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  &:hover {
    .pan-thumb {
      transform: rotate(-110deg);
    }
  }
  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    .pan-info-roles-container {
      padding: 27px;
      text-align: center;
    }
  }
  .pan-thumb {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
}
</style>
