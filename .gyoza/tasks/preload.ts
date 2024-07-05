import { $hashFile } from "$/fs"
import replitConfig from "~/.replit";
import bunConfig from "~/bunfig.toml";

const map = { ...await $hashFile(".replit", "replit.config", replitConfig), ...await $hashFile("bunfig.toml", "bun.config", bunConfig) };

await Bun.write(".gyoza/.tmp/head.json", JSON.stringify(map));