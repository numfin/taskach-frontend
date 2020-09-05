import { resolve } from "path";
import config from "./vite.config";

config.root = "examples";
config.alias["/examples/"] = resolve(__dirname, "./examples");

export default config;
