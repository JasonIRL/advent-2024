import { loadData } from "./utils/load-data.js";

/**
 *
 * @param {string} data
 * @returns {Array<number[]>}
 */
function parseReportData(data) {
	return data
		.split("\n")
		.map((line) => line.split(" ").map((i) => Number.parseInt(i)));
}

/**
 *
 * @param {Array<number[]>} data
 * @param {dampen} boolean
 * @returns {number} number of safe reports
 */
function safetycheck(data, dampen = false) {
	const safetyList = data.map((entry) => {
		const entriesIncreasing = entry.every((num, index, arr) => {
			if (index === 0) return true;
			return num > arr[index - 1];
		});

		const entriesDecreasing = entry.every((num, index, arr) => {
			if (index === 0) return true;
			return num < arr[index - 1];
		});

		const entriesWithinRange = entry.every((num, index, arr) => {
			if (index === 0) return true;
			const difference = Math.abs(num - arr[index - 1]);
			return difference <= 3;
		});

		return (entriesIncreasing || entriesDecreasing) && entriesWithinRange;
	});

	const safe = safetyList.filter((entry) => entry === true).length;
	const unsafe = safetyList.length - safe;

	return { safe, unsafe };
}

function partOne(path) {
	const data = loadData(path);
	const parsed = parseReportData(data);
	const { safe, unsafe } = safetycheck(parsed);
	console.log(`part one: ${safe}`);
}

function partTwo(path) {
	const data = loadData(path);
	const parsed = parseReportData(data);
	const { safe, unsafe } = safetycheck(parsed);
	console.log(`part two: ${{ safe, unsafe }}`);
}

partOne("src/data/day_02.txt");
partTwo("src/data/day_02.txt");
