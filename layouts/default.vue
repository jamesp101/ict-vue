<template>
  <div class="layout">
    <b-navbar>
      <template #end>
        <b-navbar-item>
          <nuxt-link to="/login" class="button">Login</nuxt-link>
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

