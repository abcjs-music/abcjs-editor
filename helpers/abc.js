export const abcTitle = (abcString) => {
	if (!abcString)
		return "untitled";
	const arr = abcString.split("\nT:");
	if (arr.length < 2)
		return "untitled";
	const arr2 = arr[1].split("\n");
	if (arr2.length < 2)
		return "untitled";
	return arr2[0].trim();
};

export const abcFilename = (abcString) => {
	const title = abcTitle(abcString).replace(/[^\w]/g, "-");
	return `${title}.abc`;
};
