<script>
export default {
  name: "Template_Dark_Main_Header"
}
</script>

<template>
  <q-toolbar class="text-center">
    <q-toolbar-title class="text-left">
      <q-icon class="q-mr-md" color="white" size="md" name="fa-duotone fa-regular fa-grid-2"></q-icon>
      <strong v-if="this.$route.name==='index'" class="font-lalezar font-weight-100 font-26">
        پرگولا
      </strong>
      <span v-else class="animation-fade-in text-blue-grey-1  font-15  font-weight-700">

        {{this.$route.meta.title}}
      </span>

    </q-toolbar-title>
  </q-toolbar>
</template>

<style scoped>

</style>