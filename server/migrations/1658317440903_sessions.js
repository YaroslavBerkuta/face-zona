/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("sessions", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    accessToken: { type: "varchar(255)", notNull: true },
    refreshToken: { type: "varchar(255)", notNull: true },
    createdAt: {
      type: "timestamp",
      otNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("sessions");
};
