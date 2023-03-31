// import logger1 from 'fluent-logger';
import { FluentClient } from "@fluent-org/logger";


const logger2 = new FluentClient("gpsihm", {
  socket: {
    host: "35.193.85.128",
    port: 30002,
    timeout: 3000, // 3 seconds
  }
});

logger2.emit({ level: "error", type: "SYSTEM", message: `Test 23 mars` })
  .then(value => {
    console.log(value);

  })
