
<template>
  <section>
    <div class="has-background-primary">
      <h1 class="is-size-1 has-text-white">Orders</h1>
      <b-field>
        <b-input placeholder="Search..." type="search" icon="magnify" icon-clickable></b-input>
      </b-field>
      <b-field>
        <b-button
          v-for="(item, key) in menu"
          :key="key"
          v-on:click="menuClick(item.click)"
          :icon-left="item.icon"
          :type="item.type"
        ></b-button>
      </b-field>
    </div>
    <section class="full">
      <b-field grouped class></b-field>
      <b-table
        class="is-fullwidth is-fullheight px-4"
        paginated
        backend-pagination
        striped
        :loading="isLoading"
        :data="data"
        :total="total"
        :per-page="perPage"
        :selected.sync="selected"
        @page-change="onPageChange"
        pagination-rounded
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column field="order" label="Order ID" v-slot="props">{{ props.row.order }}</b-table-column>
        <b-table-column
          field="orderDate"
          label="Order Date"
          v-slot="props"
        >{{ props.row.orderDate }}</b-table-column>
        <b-table-column
          field="customerID"
          label="Customer ID"
          v-slot="props"
        >{{ props.row.customerId }}</b-table-column>
        <b-table-column
          field="deliveryDate"
          label="Delivery Date"
          v-slot="props"
        >{{ props.row.deliveryDate }}</b-table-column>
        <b-table-column
          field="netAmount"
          label="Net Amount"
          v-slot="props"
          class="has-background-primary"
        >
          <b>{{ props.row.netAmount }}</b>
        </b-table-column>

        <b-table-column field="status" label="Status" numeric v-slot="props">
          <b
            v-if="props.row.status == 'Open'"
            class="has-background-warning has-text-white pr-5"
          >{{ props.row.status }}</b>
          <b
            v-else-if="props.row.status == 'Processed - Invoice'"
            class="has-background-success has-text-white"
          >{{ props.row.status }}</b>
          <b v-else class="has-background-dark has-text-white">{{ props.row.status }}</b>
        </b-table-column>
      </b-table>
    </section>
  </section>
</template>

<script>
export default {
  layout: "app",
  created() {
    this.loadData();
  },
  methods: {
    onPageChange(page) {
      this.page = page;
      this.loadData();
    },
    async loadData() {
      this.isLoading = true;
      this.data = [];
      const data = await this.$axios.get(
        `/orders?page=${this.page}&limit=${this.perPage}`
      );

      for (let i of data.data.docs) {
        console.log(i);
        this.data.push({
          _id: i._id,
          order: i.order || i._id,
          orderDate: i.orderDate || i.newDeliverDate,
          customerId: i.customerName || i.account,
          routeName: i.routeName,
          routeCode: i.routeCode,
          deliveryDate: i.deliveryDate,
          netAmount: i.netAmount,
          status: i.status,
        });
      }

      this.total = data.data.totalDocs;

      this.isLoading = false;
    },
    clickAdd() {
      console.log("HelloWOrld");
    },
    clickDelete() {
      console.log("Delete");
    },
    clickEdit() {
      console.log("Delete");
    },
    clickRefresh() {
      this.loadData();
    },
    menuClick(e) {
      switch (e) {
        default:
          break;
        case "clickAdd":
          this.clickAdd();
          return;
        case "clickDelete":
          this.clickDelete();
          return;
        case "clickEdit":
          this.clickEdit();
          return;
        case "clickRefresh":
          this.clickEdit();
          return;
      }
    },
  },

  data() {
    return {
      menu: [
        {
          title: "refresh",
          icon: "reload",
          click: "clickRefresh",
          type: "is-primary",
        },
        {
          title: "add",
          icon: "plus",
          click: "clickAdd",
          type: "is-primary",
        },
        {
          title: "edit",
          icon: "pencil",
          click: "clickDelete",
          type: "is-primary",
        },
        {
          title: "delete",
          icon: "trash-can",
          click: "clickDelete",
          type: "is-danger",
        },
      ],
      data: [],
      isLoading: true,
      page: 1,
      perPage: 15,
      total: 0,
      selected: {},
    };
  },
};
</script>

<style scoped>
</style>
