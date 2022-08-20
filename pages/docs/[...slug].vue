<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <h1 class="mt-12 md:mt-0">{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </main>
</template>
