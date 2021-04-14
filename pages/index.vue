<template>
  <div>
    <div class="hero is-fullheight">
      <div class="hero-body columns is-centered">
        <div class="column is-4 has-text-centered box">
          <img src="/bnhs-logo-128.png" alt />
          <h1>
            <b>Bukidnon National High School</b>
          </h1>
        </div>
      </div>
    </div>
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
.myImage {
}
</style>
