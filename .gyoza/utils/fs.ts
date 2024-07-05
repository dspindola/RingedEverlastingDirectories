export const $tmpdir = () =>
    `${Bun.GYOZA_TEMP_DIR}`;

export const $tmpfile = ($name: string) =>
    `${Bun.GYOZA_TEMP_DIR}/${$name}`;

export const $hashFile = ($path: string, $hash: any) =>
    `${Bun.GYOZA_TEMP_DIR}/${$path}.${$hash}.txt`;

export const $write = ($path: string, $content: string) =>
    Bun.write($path, $content);