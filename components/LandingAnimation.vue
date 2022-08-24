<script setup lang="ts">
import { Events } from "~~/utils/interface";
import LogCard from "./LogCard.vue";

const { counter, pause, resume } = useInterval(3000, { controls: true });
const events: Events[] = [
  {
    icon: "⚡️",
    name: "v2.0.0-rc.3 deployed!",
    description: `Features
- add channel config type and enums (2f5e706)`,
    created_at: "2022-08-18T12:31:22.027Z",
  },
  {
    icon: "💵",
    name: "New Customer - $9.89",
    description: `foo@bar.com has subscribe to your course`,
    created_at: "2022-08-18T14:51:22.027Z",
  },
  {
    icon: "📧",
    name: "Visitor joined waitlist!",
    description: `foo@bar.com has join your SimpleLog waitlist`,
    created_at: "2022-08-16T00:51:22.027Z",
  },
  {
    icon: "🆎",
    name: "Test",
    description: `Test dev`,
    created_at: "2022-08-17T20:11:00.027Z",
  },
  {
    icon: "🔌",
    name: "Server is down!",
    description: `Too many websocket connection at once.
Should have use Supabase`,
    created_at: "",
  },
  {
    icon: "✨",
    name: "New record on table Courses",
    description: `{"id": "a7adcf75-e0f7-47a4-a3d9-e1fb809ee003",
"title": "Building a Course with Notion",
"description": "Want to build a course in Notion with interactive element?"}`,
    created_at: "2022-07-17T22:41:00.027Z",
  },
];

const buttons: String[] = [
  "i-logos-github-icon translate-x-8 -translate-y-20",
  "i-logos-stripe translate-x-40 -translate-y-5",
  "i-logos-webhooks translate-x-40 translate-y-20",
  "i-logos-ruby translate-x-8 translate-y-38",
  "i-logos-nodejs-icon -translate-x-24 translate-y-20",
  "i-logos-supabase-icon -translate-x-24 -translate-y-5",
];

watch(counter, () => {
  if (counter.value > 6) {
    counter.value = 1;
  }
});
</script>

<template>
  <div
    class="relative h-80 mt-26 lg:mt-12 flex items-center justify-center w-full transform scale-75 md:scale-100"
  >
    <div>
      <button
        v-for="(button, idx) in buttons"
        :key="idx"
        @click="counter = idx + 1"
        :class="[
          { '!saturate-100 !opacity-100 !scale-120': counter === idx + 1 },
          button,
        ]"
        class="text-5xl absolute filter saturate-0 opacity-30 hover:saturate-100 hover:opacity-100 scale-100 hover:scale-120 transition ease-in-out"
      />
      <div class="w-28 h-28 flex items-center justify-center rounded-full">
        <img src="~/assets/logo.svg" alt="SimpleLog" />

        <div class="z-10 relative">
          <transition appear name="fade">
            <LogCard
              v-if="counter >= 1"
              class="!w-96 absolute -translate-x-65 -translate-y-80 md:-translate-y-40"
              :class="[
                [1, 2, 3].includes(counter)
                  ? 'md:-translate-x-125'
                  : 'md:translate-x-0',
              ]"
              :key="counter"
              :data="events[counter - 1]"
              @mouseenter="pause"
              @mouseleave="resume"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
