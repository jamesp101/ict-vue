<template>
  <div>
    <div class="row has-background-primary">
      <h1 class="has-text-white py-2">
        <b>Pre Registration</b>
      </h1>
      <b-input placeholder="Search" type="search" icon="magnify" @change="searchTextChange"></b-input>
    </div>
    <b-table :data="data" :columns="columns" :selected.sync="selectedData" @click="rowSelected" />
  </div>
</template>

<script>
export default {
  async created() {
    const data = await this.$axios.$get("/person/not_activated");
    for (let person of data) {
      this.data.push({
        id: person._id,
        lastname: person.lastname,
        firstname: person.firstname,
        middlename: person.middlename,
        birthday: person.birthday,
        gender: person.gender,
        address: person.address,
        createdAt: person.createdAt,
      });
    }
  },
  data() {
    return {
      data: [],
      columns: [
        {
          field: "lastname",
          label: "Last name",
        },
        {
          field: "firstname",
          label: "First name",
        },
        {
          field: "middlename",
          label: "MI",
        },
        {
          field: "birthday",
          label: "Bday",
        },
        {
          field: "gender",
          label: "Gender",
        },
        {
          field: "address",
          label: "Address",
        },
        {
          field: "createdAt",
          label: "Created at",
        },
      ],
      selectedData: {},
    };
  },
  methods: {
    searchTextChange() {
      console.log("HH");
    },
    rowSelected() {
      console.log("HE");
      this.$emit("data", this.selectedData);
    },
  },
};
</script>

<style>
</style>
