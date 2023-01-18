/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("blogs", {
    id: "id",
    coverImg: { type: "text" },
    categoryId: {
      type: "integer",
      notNull: true,
      references: '"blogCategoryes"',
      onDelete: "cascade",
    },
    title: {
      type: "varchar(255)",
      notNull: true,
    },
    view: { type: "integer" },
    shortDescription: { type: "text", notNull: true },
    content: {
      type: "text",
    },
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
  pgm.dropTable("blogs");
};
