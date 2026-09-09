export class BinaryHeap {
	constructor(scoreFunction) {
		this.content = [];
		this.scoreFunction = scoreFunction;
	}

	push(element) {
		this.content.push(element);
		this.bubbleUp(this.content.length - 1);
	}

	pop() {
		const result = this.content[0];
		const end = this.content.pop();
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	}

	remove(node) {
		const length = this.content.length;
		for (let index = 0; index < length; index++) {
			if (this.content[index] !== node) continue;
			const end = this.content.pop();
			if (index === length - 1) break;
			this.content[index] = end;
			this.bubbleUp(index);
			this.sinkDown(index);
			break;
		}
	}

	size() {
		return this.content.length;
	}

	bubbleUp(index) {
		const element = this.content[index];
		const score = this.scoreFunction(element);
		while (index > 0) {
			const parentIndex = Math.floor((index + 1) / 2) - 1;
			const parent = this.content[parentIndex];
			if (score >= this.scoreFunction(parent)) break;
			this.content[parentIndex] = element;
			this.content[index] = parent;
			index = parentIndex;
		}
	}

	sinkDown(index) {
		const length = this.content.length;
		const element = this.content[index];
		const elementScore = this.scoreFunction(element);
		while (true) {
			const rightIndex = (index + 1) * 2;
			const leftIndex = rightIndex - 1;
			let swap = null;
			let leftScore;
			if (leftIndex < length) {
				leftScore = this.scoreFunction(this.content[leftIndex]);
				if (leftScore < elementScore) swap = leftIndex;
			}
			if (rightIndex < length) {
				const rightScore = this.scoreFunction(this.content[rightIndex]);
				if (rightScore < (swap === null ? elementScore : leftScore)) swap = rightIndex;
			}
			if (swap === null) break;
			this.content[index] = this.content[swap];
			this.content[swap] = element;
			index = swap;
		}
	}
}
