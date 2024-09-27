<template>
  <div>
    <button v-if="prev" @click="clickPrev">prev</button>
    <button v-if="next" @click="clickNext">next</button>
  </div>
</template>

<script setup lang="ts">
type NumberOrNull = number | null

interface PropsInterface {
  prev: NumberOrNull
  next: NumberOrNull
}
type EmitType = {
  (event: 'changePage', value: NumberOrNull): void
}

const props = defineProps<PropsInterface>()

const emit = defineEmits<EmitType>()

function clickPrev() {
  emit('changePage', props.prev)
}

function clickNext() {
  emit('changePage', props.next)
}
</script>
