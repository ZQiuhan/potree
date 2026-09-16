export * from "./defines.js";
export * from "./materials/PointCloudMaterial.js";
export * from "./modules/loader/2.0/OctreeLoader.js";
export * from "./PointCloudOctree.js";
export * from "./Potree_update_visibility.js";
export {Renderer} from "./PotreeRenderer.js";

import {LRU} from "./LRU.js";
import {WorkerPool} from "./WorkerPool.js";

export const workerPool = new WorkerPool();
export let lru = new LRU();
export let pointBudget = 1 * 1000 * 1000;
export let framenumber = 0;
export let numNodesLoading = 0;
export let maxNodesLoading = 4;
export const debug = {};
export const measureTimings = false;

let scriptPath = "";

if (document.currentScript && document.currentScript.src) {
	scriptPath = new URL(document.currentScript.src + "/..").href;
	if (scriptPath.slice(-1) === "/") {
		scriptPath = scriptPath.slice(0, -1);
	}
}

export {scriptPath};
