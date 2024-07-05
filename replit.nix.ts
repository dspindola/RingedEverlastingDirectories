import { $nix, $pkgs } from "$/nix";

export default $nix({
	deps: [
		$pkgs`proto`,
		$pkgs`taplo`,
		$pkgs`vscode-langservers-extracted`,
		$pkgs`nodePackages_latest.typescript-language-server`,
		$pkgs`sqls`,
		$pkgs`nushell`,
	],
},
	{
		outfile: '.gyoza/replit.nix',
	}
);
