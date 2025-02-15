<script>
export default {
  name: "Template_Dark_Main_Header"
}
</script>

<template>
  <q-toolbar class="text-center">
    <q-toolbar-title class="text-left">
      <q-icon class="q-mr-md" color="deep-purple-10" size="md" name="fa-duotone fa-light fa-grid-2"></q-icon>
      <strong v-if="this.$route.name==='index'" class="font-lalezar font-weight-100 font-26 text-grey-9">
        پرگولا
      </strong>
      <span v-else class="animation-fade-in text-blue-grey-10  font-15  font-weight-700">
        {{this.$route.meta.title}}
      </span>
    </q-toolbar-title>
    <img class="logo-image" src="assets/images/icons/logo.png" alt="pergola">
  </q-toolbar>
</template>

<style scoped>
.logo-image{
  width: 100px;
}
</style>