<template>
  <div class="hero is-fullwidth is-fullheight">
    <div class="columns is-centered hero-body">
      <div class="column is-12">
        <div class="box">
          <h1 class="is-size-5">Place an Order</h1>
          <div class="columns is-5">
            <div class="column">
              <h1>Product List</h1>
              <b-table
                class="custom-height"
                :data="productData"
                :columns="productCol"
                :selected.sync="productSelected"
              ></b-table>
              <b-button type="is-primary" @click="onAddtoCart" label icon-left="plus" />
            </div>
            <div class="column">
              <h1>Your Cart</h1>
              <b-table
                striped
                class="custom-height"
                :data="cartData"
                :columns="cartCol"
                :selected.sync="cartSelected"
              ></b-table>
              <b-field>
                <b-button type="is-primary" @click="onRemoveFromCart" label icon-left="minus" />
                <b-button type="is-danger" @click="onEmptyCart" label icon-left="cart-remove" />
              </b-field>
            </div>
          </div>
          <div class="column">
            <b-button
              type="is-primary"
              @click="onClickFinish"
              icon-left="cart-arrow-right"
              label="Finish"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartSelected: {},
      cartData: [],
      productSelected: {},
      total: 0.0,
      cartCol: [
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

      productData: [],
      productCol: [
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
      ],
    };
  },

  created() {
    this.loadProductList();
  },
  methods: {
    onAddtoCart() {
      console.log(this.productSelected);
      if (this.productSelected == {}) {
        this.$buefy.notification.open({
          type: "is-warning",
          message: "Cannot be empty",
          hasIcon: true,
        });
        return;
      }
      const qty = parseInt(prompt("Qty"));
      if (isNaN(qty)) {
        this.$buefy.notification.open({
          type: "is-warning",
          message: "Qty Error",
          hasIcon: true,
        });
        return;
      }

      this.cartData.push({
        _id: this.productSelected._id,
        id: this.productSelected.id,
        productName: this.productSelected.productName,
        price: this.productSelected.price,
        qty: qty,
        unmodifiedPrice: this.productSelected.unmodifiedPrice,
        subTotal:
          "P " +
          (parseFloat(this.productSelected.unmodifiedPrice) * qty).toFixed(2),
        unModifiedSubTotal: parseFloat(this.productSelected.unmodifiedPrice),
      });
      this.calculateTotal();
    },
    async loadProductList() {
      this.productData = [];
      const res = await this.$axios.get("/products");
      for (let i of res.data) {
        console.log(i);
        this.productData.push({
          _id: i._id,
          id: i.productCode || i.ProductCode,
          productName: i.productName || i.ProductName,
          unmodifiedPrice: i.Price || i.price,
          price: "P" + (i.Price || i.price).toFixed(2),
        });
      }
    },
    onRemoveFromCart() {
      this.cartData = this.cartData.filter((it) => {
        return it._id != this.cartSelected._id;
      });
      this.calculateTotal();
    },
    calculateTotal() {
      this.total = 0;
      for (let i in this.cartData) {
        this.total = i.unModifiedSubTotal;
      }
    },
    onClickFinish() {
      let products = [];
      for (let i of this.cartData) {
        console.log(i);
        products.push({ productId: i._id, qty: i.qty });
      }

      const res = this.$axios.post("/orders", {
        account: this.$auth.user.message.id,
        products: products,
        status: "Open",
      });
    },
    onEmptyCart() {
      if (confirm("Clear your cart?")) {
        this.cartData = [];
      }
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
