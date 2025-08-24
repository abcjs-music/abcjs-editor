export const abcTitle = (abcString:string) => {
	if (!abcString)
		return "untitled";
	const arr = abcString.split("\nT:");
	if (arr.length < 2)
		return "untitled";
	const afterT = arr[1] ? arr[1] : ''
	const arr2 = afterT.split("\n");
	const title = arr2[0] ? arr2[0] : 'untitled'
	return title.trim();
};

export const abcFilename = (abcString:string) => {
	const title = abcTitle(abcString).replace(/\W/g, "-");
	return `${title}.abc`;
};
