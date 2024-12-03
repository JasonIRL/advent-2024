import { loadData } from "./utils/load-data.js";

/**
 * @typedef {Object} DataLists
 * @property {number[]} list1
 * @property {number[]} list2
 */

/**
 *
 * @param {string} data
 * @returns {DataLists}
 */
function parseData(data) {
	const list1 = [];
	const list2 = [];

	const lines = data.split("\n");
	for (const line of lines) {
		const nums = line.split("   ");
		list1.push(Number.parseInt(nums[0]));
		list2.push(Number.parseInt(nums[1]));
	}

	list1.sort((a, b) => a - b);
	list2.sort((a, b) => a - b);

	return {
		list1,
		list2,
	};
}

/**
 * compares the distances between each item in two lists
 * @param {DataLists} data
 * @returns {number[]} distances
 */
function compareDistances(data) {
	const { list1, list2 } = data;

	const distances = list1.map((item, index) => {
		return Math.abs(item - list2[index]);
	});

	return distances;
}

function sumLists(distances) {
	return distances.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Finds the number of times a number in list one appears in list 2
 * @param {DataLists} data
 */
function findSimilarity(data) {
	const { list1, list2 } = data;

	const similarities = list1.map((item) => {
		const count = list2.filter((num) => num === item).length;
		return count * item;
	});

	return similarities;
}

function partOne(path) {
	const data = loadData(path);
	const parsed = parseData(data);
	const distances = compareDistances(parsed);
	const sums = sumLists(distances);
	console.log(`part one: ${sums}`);
}

function partTwo(path) {
	const data = loadData(path);
	const parsed = parseData(data);
	const similar = findSimilarity(parsed);
	const sums = sumLists(similar);
	console.log(`part two: ${sums}`);
}

partOne("src/data/day_01.txt");
partTwo("src/data/day_01.txt");
