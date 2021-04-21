<template>
  <div>
    <iframe src="/ICTManual/index.html" class="frame"/>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  auth: false,
};
</script>

<style scoped>
.hero-body {
  background-image: url("/bnhs.png");
  background-repeat: no-repeat;
  background-size: cover;
  resize: both;
}
.frame{
  height: 100vh;
  width:  100vw;
}
</style>
