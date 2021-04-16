<template>
  <div>
    <b-table :data="data" :columns="columns" />
  </div>
</template>

<script>
export default {
  async created() {
    const data = await this.$axios.$get("/person");
    for (let person of data) {
      this.data.push({
        lastname: person.lastname,
      });
    }

    console.log(this.data);
  },
  data() {
    return {
      data: [],
      columns: [
        {
          field: "lastname",
          label: "Lastname",
        },
      ],
    };
  },
};
</script>

<style>
</style>
