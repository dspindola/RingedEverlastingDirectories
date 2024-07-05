declare module "bun" {
	interface Env {
		readonly port: string;
		readonly hostname: string;
		readonly origin: string;
		readonly root: string;
	}

	export const GYOZA_TEMP_DIR: string;
}
