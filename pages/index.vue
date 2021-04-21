<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  created(){
    this.$router.push('/login')
  },
 mounted(){
    this.$router.push('/login')
 } 
};
</script>

<style scoped>
.hero-body {
  background-image: url("/bnhs.png");
  background-repeat: no-repeat;
  background-size: cover;
  resize: both;
}
.myImage {
}
</style>
