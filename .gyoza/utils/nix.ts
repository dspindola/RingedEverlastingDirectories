import { inspect } from "bun";

export function $pkgs(key: TemplateStringsArray, ...args: string[]) {
    return `pkgs.${key}`;
}

function parse(userConfig: {
    deps?: string[], environment?: {
        systemPackages?: string[],
        shell?: string,
        shellPackages?: string[],
        systemFeatures?: string[],
    }
}) {
    const _pkgs = {
        deps: userConfig.deps,
        environment: userConfig?.environment,
    };
    const schema = inspect({
        pkgs: _pkgs,
        environment: userConfig?.environment,
    });

    return new ShadowRealm().evaluate(`
	let deps = [];
    let environment = {
    };
	
	if ((${schema})['pkgs']['deps']) {
		deps = (${schema})['pkgs']['deps'].map(dep => \`    \${dep}\`).join("\\n");
	}

    if ((${schema})['environment'] && (${schema})['environment']['systemPackages']) {
        const {systemPackages} = (${schema})['environment'];
        environment = {
            systemPackages: (systemPackages ? systemPackages.map(pkg => \`    \${pkg}\`).join("\\n") : '[]')
        }
    }
	
	const config = \`
{ pkgs }: {\${environment['systemPackages'] ? \`\n  environment.systemPackages = [\n\${environment['systemPackages']}\n  ];\n\` : ''} 
  \${deps ? \`deps = [\n\${deps}\n  ];\` : \`deps = [];\`}
}
\`
	if (process.env.LOG) {
		console.log(config);
	}

	config
	`);
}

export async function $nix(userConfig: {
    deps?: string[],
    environment?: {
        systemPackages?: string[],
        shell?: string,
        shellPackages?: string[],
        systemFeatures?: string[],
    }
}, { outfile }: { outfile: string }) {
    const schema = parse(userConfig);
    await Bun.write(outfile, schema);
    return await Bun.file(outfile).text();
}