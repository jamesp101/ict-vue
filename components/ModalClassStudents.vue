<template>
  <div class="modal-card mod-height">
    <div class="modal-card-body">
      <b-field lable="Add Students">
        <b-taginput
          v-model="tags"
          type="text"
          @typing="filteredDataObj"
          :data="data"
          placeholder="Teacher"
          open-on-focus
          clearable
          field="fullname"
          autocomplete
          :allowNew="allowNew"
        ></b-taginput>
      </b-field>
      <b-field>
        <b-button @click="clickFinish" type="is-primary" label="Finish"></b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      tags: [],
      allowNew: false,
      dStudents: this.students,
    };
  },
  props: {
    students: Array,
  },
  async created() {
    const data = await this.$axios.$get("/account?access=1");
    for (let i of data) {
      i.fullname = i.person.firstname + ", " + i.person.lastname;
    }
    this.data = data;
  },
  methods: {
    filteredDataObj(text) {
      return this.data.filter((option) => {
        return (
          option.person.lastname
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },

    clickFinish() {
      console.log(this.tags);
    },
    loadStudents() {
      this.dStudents.some((it) => {
        console.log(it);
      });
    },
  },
};
</script>

<style>
.mod-height {
  height: 600px;
}
</style>
