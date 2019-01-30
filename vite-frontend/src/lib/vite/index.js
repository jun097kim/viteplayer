import provider from "@vite/vitejs/dist/es5/provider/WS";
import { client } from "@vite/vitejs";

const WS_RPC = new provider("ws://127.0.0.1:41420");

const myClient = new client(WS_RPC, _myClient => {
  console.log("Connected");
});

export default myClient;