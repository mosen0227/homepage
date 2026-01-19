<script setup>
import { ref } from 'vue'
import Cursor from '@/components/Cursor.vue'
import Footer from '@/components/Footer.vue'
import Level from '@/components/Level.vue'
import Toolbox from '@/components/Toolbox.vue'
import Contact from '@/components/Contact.vue'
import Task from '@/components/Task.vue'
import Loading from '@/components/Loading.vue'
import Background from '@/components/Background.vue'
import Banner from '@/components/Banner.vue'
import { useLoading } from '@/composables/useLoading'
import { useResponsive } from '@/composables/useResponsive'

// 状态管理
const l2dOnly = ref(true)
const canSkipit = ref(true)

// 使用composables
const { loading, percent } = useLoading()
const { changeDirection } = useResponsive()

// 方法
const switchL2D = () => {
  l2dOnly.value = !l2dOnly.value
}

const canSkip = (value) => {
  canSkipit.value = value
}
</script>

<template>
  <!-- 加载状态 -->
  <transition name="loading">
    <Loading v-if="loading" :percent="percent" />
  </transition>

  <!-- 背景 -->
  <div id="background" class="app-background"></div>

  <!-- 主要内容 -->
  <main v-if="!loading" class="app-main">
    <Suspense>
      <Background :l2dOnly="l2dOnly" @update:changeL2D="l2dOnly = $event" @canskip="canSkip" />
    </Suspense>

    <!-- 等级部分 -->
    <transition name="up">
      <Level v-if="!l2dOnly" />
    </transition>

    <!-- 工具箱 -->
    <Toolbox :l2dOnly="l2dOnly" :canskip="canSkipit" @switch="switchL2D" />

    <!-- 联系方式 -->
    <transition name="left">
      <Contact v-if="!l2dOnly" />
    </transition>

    <!-- 任务 -->
    <Task :l2dOnly="l2dOnly" />

    <!-- 横幅 -->
    <transition :name="changeDirection">
      <Banner v-show="!l2dOnly" />
    </transition>

    <!-- 页脚 -->
    <transition name="down">
      <Footer v-if="!l2dOnly" />
    </transition>

    <!-- 幕布效果 -->
    <div id="curtain"></div>
  </main>

  <!-- 自定义光标 -->
  <Cursor />
</template>

<style scoped>
/* 导入样式文件 */
@import '@/assets/app.css';

/* 主要内容区域 */
main {
  display: flex;
  flex-direction: column;
}
</style>
