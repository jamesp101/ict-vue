
<template>
  <div class="hero is-fullwidth is-fullheight">
    <div class="columns is-centered hero-body">
      <div class="column is-12">
        <div class="box">
          <div class="columns is-5">
            <div class="column is-6">
              <h1 class="is-size-5">History</h1>
              <b-table
                striped
                class="custom-height"
                :data="historyData"
                :columns="historyColumn"
                :selected.sync="historySelected"
              ></b-table>
              <b-button type="is-danger" @click="onCancelOrder">Cancel Order</b-button>
            </div>
            <div class="column is-6">
              <h1>Info</h1>
              <b-table striped class="custom-height" :data="cartData" :columns="cartColumn"></b-table>
              <b-field></b-field>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      historySelected: {},
      historyData: [],
      historyColumn: [
        {
          field: "id",
          label: "Order Code",
        },
        {
          field: "orderDate",
          label: "Order Date",
        },
        {
          field: "deliveryDate",
          label: "Delivery Date",
        },
        {
          field: "status",
          label: "Status",
        },
      ],
      cartSelected: {},
      cartData: [],

      cartColumn: [
        {
          field: "id",
          label: "Product Code",
        },
        {
          field: "productName",
          label: "Name",
        },
        {
          field: "price",
          label: "Price",
        },
        {
          field: "qty",
          label: "Quantity",
        },
        {
          field: "subTotal",
          label: "Sub Total",
        },
      ],
    };
  },
  created() {
    this.loadHistory();
  },
  methods: {
    async loadHistory() {
      this.historyData = [];
      const userId = this.$auth.user.message.id;
      const res = await this.$axios.get(`/orders/account/${userId}`);

      for (const i of res.data) {
        this.historyData.push({
          _id: i._id,
          id: i.order || i._id,
          orderDate: i.orderDate || i.newOrderDate,
          status: i.status || "Open",
        });
      }
    },

    async loadProducts() {
      this.cartData = [];
      const res = await this.$axios.get(`/orders/${this.historySelected._id}`);

      for (const i of res.data[0].productInfo) {
        this.cartData.push({
          _id: i._id,
          id: i.productCode || i.ProductCode,
          productCode: i.productCode || i.ProductCode,
          productName: i.productName || i.ProductName,
          originalPrice: i.price || i.Price,
          price: "PHP " + (i.price || i.Price).toFixed(2),
        });
      }
    },
    async onHistorySelect() {
      this.loadProducts();
    },
    async onCancelOrder() {
      if (!confirm("Are you sure you want to cancel this order?")) {
        return;
      }
      console.log(this.historySelected);
      const res = await this.$axios.put(`/orders/${this.historySelected.id}`, {
        status: "Cancelled",
      });
      if (res.status != 200) {
        this.$buefy.notification.open({
          type: "is-danger",
          message: `Something went wrong`,
          hasIcon: true,
        });
        return;
      }
      this.$buefy.notification.open({
        type: "is-warning",
        message: `Order cancellled`,
        hasIcon: true,
      });
      this.loadHistory();
    },
  },
  watch: {
    historySelected: function (val) {
      this.loadProducts();
    },
  },
};
</script>

<style scoped>
.custom-height {
  height: 60vh;
  border: 1px solid black;
  overflow: auto;
}
</style>
