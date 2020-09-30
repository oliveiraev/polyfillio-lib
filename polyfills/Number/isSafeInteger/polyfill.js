/* global CreateMethodProperty, IsInteger */
// 20.1.2.5. Number.isSafeInteger ( number )
CreateMethodProperty(Number, 'isSafeInteger', function isSafeInteger(number) {
	// 1. If ! IsInteger(number) is true, then
	if (IsInteger(number)) {
		// 1.a. If abs(number) ≤ 253 - 1, return true.
		if (Math.abs(number) <= (Math.pow(2, 53) - 1)) {
			return true;
		}
	}
	// 2. Return false.
	return false;
});
