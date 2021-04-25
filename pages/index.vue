<template>
  <div>
    <div class="hero is-fullheight">
      <div class="hero-body columns is-centered">
        <div class="column is-4 has-text-centered box">
          <h1>
            <b>Alaska</b>
          </h1>
          <nuxt-link to="/login" class="button is-primary">Login</nuxt-link>
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
  background-repeat: no-repeat;
  background-size: cover;
  resize: both;
}
.myImage {
}
</style>
