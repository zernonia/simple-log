<script setup lang="ts">
const props = defineProps({
  description: String,
})

const isUUID = (text: string) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
  return regexExp.test(text)
}

const isStringParsable = (text: string) => {
  try {
    JSON.parse(text)
    if (text?.[0] != "{") return false
  } catch (e) {
    return false
  }
  return true
}

const isKeyValue = (text: string) => {}

const parsedDescription = computed(() => {
  if (!props.description) return []
  let textArray: string[] | [string, unknown][] = []
  if (isStringParsable(props.description)) {
    textArray = Object.entries(JSON.parse(props.description))
  } else {
    textArray = props.description.split("\n")
  }
  //todo: parse md, date, email, uuid
  // console.log(textArray)
  return textArray
})
</script>

<template>
  <div>
    <div v-for="item in parsedDescription">
      <div class="flex" v-if="Array.isArray(item)">
        {{ item.map((i) => JSON.stringify(i).replaceAll(`"`, "")).join(": ") }}
      </div>
      <div v-else>
        {{ item }}
      </div>
    </div>
  </div>
</template>
