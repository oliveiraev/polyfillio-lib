/* global CreateMethodProperty, IsInteger */
// 20.1.2.3. Number.isInteger ( number )
CreateMethodProperty(Number, 'isInteger', function isInteger(number) {
	// 1. Return ! IsInteger(number).
	return IsInteger(number);
});
