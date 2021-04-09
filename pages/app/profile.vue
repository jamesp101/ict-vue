<template>
  <div class="profile-page">
    <div class="columns is-centered">
      <div class="column has-text-centered">
        <img
          class="profile-image"
          src="https://www.croptecshow.com/wp-content/uploads/2017/04/guest-avatar-250x250px.png?x84123"
          alt
        />
        <p>
          <b>Firstname Lastname</b>
        </p>
      </div>
    </div>
    <div class="columns is-centered is-8">
      <div class="column is-4 box is-fullheight">
        <h1>
          <b>Basic Information</b>
        </h1>
        <b-field label="First name">
          <b-input :disabled="isNotEdit"></b-input>
        </b-field>
        <b-field label="Last name">
          <b-input :disabled="isNotEdit"></b-input>
        </b-field>
        <b-field label="Birthdate">
          <b-input class="mx-1" :disabled="isNotEdit"></b-input>
          <b-input class="mx-1" :disabled="isNotEdit"></b-input>
          <b-input class="mx-1" :disabled="isNotEdit"></b-input>
        </b-field>
      </div>
      <div class="column is-4 box is-fullheight">
        <h1>
          <b>Address</b>
        </h1>
        <b-field label="Street">
          <b-input :disabled="isNotEdit"></b-input>
        </b-field>
        <b-field label="Barangay">
          <b-input :disabled="isNotEdit"></b-input>
        </b-field>
        <b-field label="City/Municapility">
          <b-input :disabled="isNotEdit"></b-input>
        </b-field>
        <b-field label="Province">
          <b-input :disabled="isNotEdit"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      isNotEdit: true,
      info: [],
    };
  },
};
</script>

<style scoped>
.profile-page {
  padding: 1.5em;
}
.profile-image {
  height: 150px;
  border-radius: 50%;
}
</style>
