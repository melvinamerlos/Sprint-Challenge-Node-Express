// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
require("dotenv").config();
const server = require("./server.js");
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`\n The server is listening at http://localhost:${port} \n`);
});