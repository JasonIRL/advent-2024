import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadData(path) {
	return readFileSync(resolve(path), "utf-8", (err, data) => {
		if (err) throw err;

		return data;
	});
}
