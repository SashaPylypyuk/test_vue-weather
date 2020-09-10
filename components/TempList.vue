<template>
  <div>
    <h4 v-for="t in time" :key="t.dt">
      {{ editDate(new Date(t.dt * 1000)) }}:00 темература {{ t.temp }}
    </h4>
  </div>
</template>

<script>

export default {
  props: ['time'],
  methods: {
    editDate (Date) {
      const month = Date.getMonth() >= 10 ? Date.getMonth() + 1 : `0${Date.getMonth() + 1}`
      const date = Date.getDate() >= 10 ? Date.getDate() : `0${Date.getDate()}`
      return `${month}.${date} ${Date.getHours()}`
    }
  }
}
</script>
