<template>
  <div class="layout">
    <b-navbar type="is-primary">
      <template #end>
        <b-navbar-item class="buttons">
          <nuxt-link to="/login"></nuxt-link>
          <b-button></b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  auth: false,
  head: {
    title: "Bukidnon National High School",
  },
};
</script>

