// setter name for a property name
export function setterName(propName) {
	return propName2GetterSetterName("set", propName);
};

// getter name for a property name
export function getterName(propName, isBooleanProp = false) {
	return propName2GetterSetterName(isBooleanProp ? "is" : "get", propName);
};

function propName2GetterSetterName(getterSetterPrefix, propName) {
	if (!propName) return getterSetterPrefix + "Unknown";
	return (
		getterSetterPrefix +
		propName.charAt(0).toUpperCase() +
		propName.slice(1)
	);
}
