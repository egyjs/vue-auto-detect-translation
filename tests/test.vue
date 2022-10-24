<template>
  {{ $t('hello \' from template') }}
</template>

<script>
export default {
  name: "test",
  align: this.$t(`hello'\ from script`)
}
</script>

<style scoped>

</style>
