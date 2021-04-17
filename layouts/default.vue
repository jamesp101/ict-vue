<template>
  <div class="layout">
    <b-navbar>
      <template #start>
        <b-navbar-item>
          <nuxt-link to="/" class="button">Home</nuxt-link>
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item>
          <nuxt-link to="/app/dashboard" class="button">Login</nuxt-link>
        </b-navbar-item>
        <b-navbar-item>
          <nuxt-link to="/preregistration" class="button">Pre-registration</nuxt-link>
        </b-navbar-item>
      </template>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head: {
    title: "Bukidnon National High School",
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },

  async created() {},
};
</script>

