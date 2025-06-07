export const getLocalStorage = (key, def, type) => {
	try {
		const ret = localStorage.getItem(key);
		if (ret !== null) {
			switch (type) {
				case "Boolean":
					return ret === "true";
				case "Object":
					return JSON.parse(ret);
				case "Integer":
					return parseInt(ret, 10);
				default:
					return ret;
			}
		}
	} catch (e) {
		// If the user doesn't allow localStorage, that's their business
	}
	return def;
};

export const setLocalStorage = (key, value) => {
	try {
		localStorage.setItem(key, value);
	} catch (e) {
		// If the user doesn't allow localStorage, that's their business
	}
};
