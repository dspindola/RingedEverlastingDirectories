
{ pkgs }: { 
  deps = [
    pkgs.proto
    pkgs.taplo
    pkgs.vscode-langservers-extracted
    pkgs.nodePackages_latest.typescript-language-server
    pkgs.sqls
    pkgs.nushell
  ];
}
