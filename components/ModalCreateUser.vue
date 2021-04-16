<template>
  <div class="modal-card">
    <div class="modal-card-body">
      <b-field label="Username">
        <b-input type="text" />
      </b-field>
      <b-field label="Password">
        <b-input type="text" />
      </b-field>
      <b-field label="User Type">
        <b-select name>
          <option selected>Student</option>
          <option>Teacher</option>
          <option>Admin</option>
        </b-select>
      </b-field>
      <table-persons class="limit" />
    </div>
  </div>
</template>

<script>
import TablePersons from "./TablePersons.vue";
export default {
  components: { TablePersons },
};
</script>

<style scoped lang="scss">
.limit {
  height: 22rem;
  overflow: auto;
}
</style>
