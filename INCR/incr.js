class IncrGame {
	constructor() {
		this.intervalId = null;
	}

	get lastUpdatedStorageKey() {
		return 'lastUpdated';
	}

	get curPointsStorageKey() {
		return 'curPoints';
	}

	getLastUpdated() {
		let lastUpdated = null;
		let lastUpdatedFromStorage = localStorage.getItem(this.lastUpdatedStorageKey);
		if (lastUpdatedFromStorage) {
			lastUpdated = new Date(lastUpdatedFromStorage);
		}

		return lastUpdated;
	}

	getCurPoints() {
		let curPoints = 0;
		let pointsFromStorage = parseInt(localStorage.getItem(this.curPointsStorageKey));
		if (pointsFromStorage) {
			curPoints = pointsFromStorage;
		}

		return curPoints;
	}

	saveCurPoints(curPoints) {
		localStorage.setItem(this.curPointsStorageKey, curPoints);
	}

	update() {
		let lastUpdated = this.getLastUpdated();
		let curPoints = this.getCurPoints();
		if (lastUpdated) {
			let ticks = new Date() - lastUpdated;
			curPoints += Math.floor(ticks / 1000);
		}

		this.saveCurPoints(curPoints);
		this.showScore(curPoints);

		this.resetTimer();
	}

	resetTimer() {
		localStorage.setItem(this.lastUpdatedStorageKey, new Date());
	}

	showScore(points) {
		document.querySelector('span#score').innerHTML = points;
	}

	start() {
		const updateFunc = this.update.bind(this);
		updateFunc();
		this.intervalId = setInterval(updateFunc, 1000);
	}

	stop() {
		clearInterval(this.intervalId);
	}

	reset() {
		this.resetTimer();
		this.saveCurPoints(0);
	}
}
