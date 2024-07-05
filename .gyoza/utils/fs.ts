import { hash } from "ohash";
import { $exports } from "./mod";

export const $tmpdir = () =>
    `${Bun.GYOZA_TEMP_DIR}`;

export const $tmpfile = ($name: string) =>
    `${Bun.GYOZA_TEMP_DIR}/${$name}`;

export const $hashFile = async (path: string, $path: string, $content: any) =>
    await Bun.write(`${Bun.GYOZA_TEMP_DIR}/${$path}.${hash($content)}.txt`, $exports($content))
        .then(() => {
            return { [path]: `${Bun.GYOZA_TEMP_DIR}/${$path}.${hash($content)}.txt` }
        })

export const $write = ($path: string, $content: string) =>
    Bun.write($path, $content);