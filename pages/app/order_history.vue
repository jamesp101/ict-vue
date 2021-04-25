
<template>
  <div class="hero is-fullwidth is-fullheight">
="onHistorySelect"
              ></b-table>
              <b-button type="is-primary">Cancel Order</b-button>
            </div>
            <div class="column">
              <h1>Info</h1>
              <b-table
                striped
                class="custom-height"
                :data="cartData"
                :columns="cartColumn"
                :selected.sync="cartSelected"
              ></b-table>
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
          label: "Code",
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
          label: "Code",
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

      console.log(res);
      for (const i of res.data[0]) {
        this.cartData.push({
          _id: i._id,

          id: i.ProductsCode || i.productsCode || i._id,
          price: i.price,
        });
      }
    },
    async onHistorySelect() {
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
