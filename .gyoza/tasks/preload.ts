import { hash } from "ohash";
import { inspect, write } from "bun";

import replitConfig from "../../.replit";
import bunConfig from "../../bunfig.toml";

const out = ($name: string, $hash: string) =>
	`${Bun.GYOZA_TEMP_DIR}/${$name}.${$hash}.txt`;

const exports = (content: any) => `export default ${inspect(content)}`;

await write(out("replit.config", hash(replitConfig)), exports(replitConfig));

await write(out("bun.config", hash(bunConfig)), exports(bunConfig));
