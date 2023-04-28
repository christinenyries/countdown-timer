<script setup lang="ts">
import { millisecondsToDay } from '@/helpers'
import { ref, watch } from 'vue'

const props = defineProps({
  from: {
    type: Date,
    required: true
  }
})

const days = ref(millisecondsToDay(props.from.getTime()))
const hours = ref(props.from.getUTCHours())
const minutes = ref(props.from.getUTCMinutes())
const seconds = ref(props.from.getUTCSeconds())
const timer = ref<number>(0)

const show = () => {
  timer.value = setInterval(() => {
    const to = new Date()
    const remainingTime = props.from.getTime() - to.getTime()
    if (remainingTime < 0) {
      clearInterval(timer.value)
      return
    }
    const d = new Date(remainingTime)
    days.value = millisecondsToDay(d.getTime())
    hours.value = d.getUTCHours()
    minutes.value = d.getUTCMinutes()
    seconds.value = d.getUTCSeconds()
  }, 1000)
}

watch(
  () => props.from,
  () => {
    days.value = millisecondsToDay(props.from.getTime())
    hours.value = props.from.getUTCHours()
    minutes.value = props.from.getUTCMinutes()
    seconds.value = props.from.getUTCSeconds()
    clearInterval(timer.value)
    show()
  }
)

show()
</script>

<template>
  <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
    <div class="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
      <span class="countdown font-mono text-5xl">
        <span :style="`--value: ${days}`"></span>
      </span>
      days
    </div>
    <div class="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
      <span class="countdown font-mono text-5xl">
        <span :style="`--value: ${hours}`"></span>
      </span>
      hours
    </div>
    <div class="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
      <span class="countdown font-mono text-5xl">
        <span :style="`--value: ${minutes}`"></span>
      </span>
      min
    </div>
    <div class="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
      <span class="countdown font-mono text-5xl">
        <span :style="`--value: ${seconds}`"></span>
      </span>
      sec
    </div>
  </div>
</template>
