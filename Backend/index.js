const server = require("./src/app");
const { conn } = require("./src/db");

conn.sync({ alter: true }).then(() => {
  // recmendable dejar en alter
  server.listen(3001, () => {
    console.log("Server raised on port 3001 -- All  OK");
  });
});
