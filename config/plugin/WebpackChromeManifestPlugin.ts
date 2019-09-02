import * as fsextra from "fs-extra";
import * as path from "path";
import * as webpack from "webpack";
import {manifest} from "../manifest/";

const FILE_NAME = "manifest.json";

class WebpackChromeManifestPlugin {
	private options;
	constructor(options: object = {}) {
		this.options = Object.assign({
			chunks: ["background"],
			field: "background",
			serilize: (obj: object) => {
				return JSON.stringify(obj, null, 2);
			}
		}, options);
	}
	// Define `apply` as its prototype method which is supplied with compiler as its argument
	apply(compiler: webpack.Compiler) {
		const odist = compiler.options.output.path;
		const filepath = path.resolve(odist, FILE_NAME);
		const module = manifest[this.options.field];
		// Specify the event hook to attach to
		compiler.hooks.emit.tapAsync(
			"WebpackChromeManifestPlugin",
			(compilation, callback) => {
				const { chunks } = this.options;
				// console.log(chunks);
				for (const chunk of compilation.chunks) {
					// console.log(chunk)
					for (const file of chunk.files) {
						if (chunks.indexOf(chunk.name) > -1) {
							if (module) {
								module.scripts = module.scripts || [];
								module.scripts.push(file);
							}
						}
					}
				}
				const output = this.options.serilize(manifest);
				compilation.assets[FILE_NAME] = {
					source: () => output,
					// tslint:disable-next-line:object-literal-sort-keys
					size: () => output.length,
				};
				fsextra.outputFileSync(filepath, output);
				callback();
			}
		);
	}
}

export  {WebpackChromeManifestPlugin};
