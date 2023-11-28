const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    items: [
      {
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    UserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAddedInOrder: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = {
  CartModel,
};
