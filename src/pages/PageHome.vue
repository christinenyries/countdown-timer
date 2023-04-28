<script setup lang="ts">
import { computed, ref } from 'vue'

import CountdownTimer from '@/components/CountdownTimer.vue'
import { millisecondsInOneDay } from '@/helpers'

const pad = (n: number) => n.toString().padStart(2, '0')
const toDateTimeLocalString = (d: Date) => {
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  return `${year}-${pad(month)}-${pad(date)}T${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

const dateTimeTomorrow = new Date(Date.now() + millisecondsInOneDay)
const dateTime = ref(new Date(dateTimeTomorrow.getTime()))

const dateTimeCopy = ref(new Date(dateTime.value.getTime()))
const dateTimeCopyInput = computed({
  get() {
    return toDateTimeLocalString(dateTimeCopy.value)
  },
  set(newDate) {
    const [year, month, date, hours, minutes, seconds] = newDate
      .split(/[-T:]/)
      .map((s) => parseInt(s))
    dateTimeCopy.value = new Date(year, month - 1, date, hours, minutes, seconds)
  }
})

const update = () => (dateTime.value = new Date(dateTimeCopy.value.getTime()))
</script>

<template>
  <div class="flex flex-col gap-10">
    <CountdownTimer :from="dateTime" />
    <form @submit.prevent="update" class="flex justify-center gap-2 text-center text-lg">
      <span>before</span>
      <div>
        <input
          type="datetime-local"
          v-model="dateTimeCopyInput"
          :min="toDateTimeLocalString(dateTimeTomorrow)"
        />
      </div>
      <input type="submit" class="btn-xs btn" value="Update" />
    </form>
  </div>
</template>
