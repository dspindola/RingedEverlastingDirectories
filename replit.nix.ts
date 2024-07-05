import { $nix, $pkgs } from "~/.gyoza/utils/nix";

export default $nix({
	deps: [
		$pkgs`proto`,
		$pkgs`taplo`,
		$pkgs`vscode-langservers-extracted`,
		$pkgs`nodePackages_latest.typescript-language-server`,
		$pkgs`sqls`,
		$pkgs`nushell`,
	],
	environment: {
		systemPackages: []
	}
},
	{
		outfile: '.gyoza/replit.nix',
	}
);
