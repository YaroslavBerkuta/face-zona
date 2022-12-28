/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("products", {
    id: "id",

    title: { type: "varchar", notNull: true },
    price: { type: "varchar(20)", notNull: true },
    salePrice: { type: "varchar(20)" },
    mainImg: { type: "varchar" },
    brand: { type: "varchar" },
    productType: { type: "varchar" },
    features: { type: "varchar" },
    advice: { type: "text" },
    response: { type: "varchar" },
    components: { type: "varchar", default: [""], Array: true },
    application: { type: "text" },
    producer: { type: "text" },
    effect: { type: "text" },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("products");
};
