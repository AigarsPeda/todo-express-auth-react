import pg from "pg";

const Poll = pg.Pool;

// if there are user with password you should add it here
export const poll = new Poll({
  host: "localhost",
  port: 5432,
  database: "perntodo"
});
