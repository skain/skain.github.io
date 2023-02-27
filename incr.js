class IncrGame {
	constructor() {
		this.intervalId = null;
		this.curPoints = 0;
		this.clicksPerSecondModifiers = [];
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
		let points = 0;
		let pointsFromStorage = parseInt(localStorage.getItem(this.curPointsStorageKey));
		if (pointsFromStorage) {
			points = pointsFromStorage;
		}

		return points;
	}

	saveCurPoints() {
		localStorage.setItem(this.curPointsStorageKey, this.curPoints);
	}

	update() {
		let lastUpdated = this.getLastUpdated();
		this.curPoints = this.getCurPoints();
		if (lastUpdated) {
			let ticks = new Date() - lastUpdated;
			this.registerAutoClicksForTicksEllapsed(ticks);
		}

		this.saveCurPoints();

		this.resetTimer();
	}

	getAutoClicksPerSecondModifier() {
		let modifier = 0;
		this.clicksPerSecondModifiers.forEach( mod => {
			modifier+=mod;
		});

		return modifier;
	}

	registerAutoClicksForTicksEllapsed(ticks) {
		let seconds = Math.floor(ticks / 1000);
		let cpsModifier = this.getAutoClicksPerSecondModifier();
		let timesToClick = Math.floor(seconds * cpsModifier);
		for (let i = 0; i < timesToClick; i++)
		{
			this.registerClick();
		}
	}

	resetTimer() {
		localStorage.setItem(this.lastUpdatedStorageKey, new Date());
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

	getClickCoefficient() {
		return 1;
	}

	getClickModifier() {
		return 1;
	}

	registerClick() {
		let coefficient = this.getClickCoefficient();
		let modifier = this.getClickModifier();

		this.curPoints += coefficient * modifier;
		this.saveCurPoints();
	}
}
