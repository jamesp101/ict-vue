<template>
  <div class="modal-card mod">
    <div class="modal-card-body">
      <b-field label="Teacher">
        <b-autocomplete
          v-model="name"
          type="text"
          :data="filteredDataObj"
          placeholder="Teacher"
          open-on-focus
          clearable
          field="fullname"
          @select="option => (selected = option)"
        ></b-autocomplete>
      </b-field>

      <b-field v-if="selected != null">
        <p class="is-size-7">id: {{selected._id}}</p>
      </b-field>

      <b-field label="Subject">
        <b-input type="text" v-model="subject"></b-input>
      </b-field>
      <b-field label="Year and Section">
        <b-input type="text" placeholder="Year" v-model="year"></b-input>
        <b-input type="text" placeholder="Section" v-model="section"></b-input>
      </b-field>
      <b-field label="Schedule">
        <b-input type="text" placeholder="MWF" v-model="schedule"></b-input>
      </b-field>
      <b-field>
        <b-button label="Submit" @click="clickSubmit" type="is-primary" class="is-pulled-right"></b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: Boolean,
    userId: String,
    classId: String,
    psection: String,
    psubject: String,
    pschedule: String,
    pyear: String,
  },
  data() {
    return {
      data: [],
      selected: null,
      name: "",
      year: this.pyear || "",
      section: this.psection || "",
      subject: this.psubject || "",
      schedule: this.pschedule || "",
    };
  },
  computed: {
    filteredDataObj() {
      return this.data.filter((option) => {
        console.log(option.person.lastname);
        return (
          option.fullname
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
  },
  async created() {
    const data = await this.$axios.$get("/account?access=2");
    for (let i of data) {
      i.fullname = i.person.firstname + ", " + i.person.lastname;
    }
    this.data = data;
    if (this.isEdit) {
      this.setData();
    }
  },

  methods: {
    setData() {
      console.log(this.data);
      this.data.some((it) => {
        console.log(it);
        console.table(it._id, this.userId);
        if (it._id === this.userId) this.selected = it;
      });
    },
    notifyError(msg) {
      this.$buefy.notification.open({
        type: "is-warning",
        message: msg,
        hasIcon: true,
      });
    },
    hasEmptyCells() {
      if (this.selected == null) {
        this.notifyError("No teacher selected");
        return true;
      }
      if (this.subject == "") {
        this.notifyError("No subject");
        return true;
      }
      if (this.year == "") {
        this.notifyError("No year level");
        return true;
      }
      if (this.section == "") {
        this.notifyError("No section");
        return true;
      }
      return false;
    },
    async clickSubmit() {
      if (this.hasEmptyCells()) return;
      if (this.isEdit) {
        const ret = await this.$axios.put(`/class/${this.classId}`, {
          teacher: this.selected._id,
          schedule: this.schedule,
          yearLevel: this.year,
          section: this.section,
          subject: this.subject,
        });
        this.$parent.close();
        return;
      }
      const ret = await this.$axios.post("/class", {
        teacher: this.selected._id,
        schedule: this.schedule,
        yearLevel: this.year,
        section: this.section,
        subject: this.subject,
      });
      this.$parent.close();
      console.log(ret);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
