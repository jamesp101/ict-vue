<template>
  <div class="box">
    <h1>{{num}}</h1>
    <h1>{{desc}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    num: "String",
    desc: "String",
  },
};
</script>

<style>
</style>
