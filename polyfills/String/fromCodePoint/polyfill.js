/* global CreateMethodProperty, IsInteger, ToNumber, CodePointToUTF16CodeUnits */

// 21.1.2.2. String.fromCodePoint ( ...codePoints )
CreateMethodProperty(String, 'fromCodePoint', function fromCodePoint(_ /*...codePoints*/) {
	// Polyfill.io - List to store the characters whilst iterating over the code points.
	var result = [];
	var codePoints = arguments;
	// 1. Let elements be a new empty List.
	var elements = [];
	// 2. For each element next of codePoints, do
	for (var i = 0; i < codePoints.length; i++) {
		var next = codePoints[i];
		// 2.a. Let nextCP be ? ToNumber(next).
		var nextCP = ToNumber(next);
		// 2.b. If ! IsInteger(nextCP) is false, throw a RangeError exception.
		if (IsInteger(nextCP) === false) {
			throw RangeError('StringCodePointInvalid: ' + next);
		}
		// 2.c. If nextCP < 0 or nextCP > 0x10FFFF, throw a RangeError exception.
		if (nextCP < 0 || nextCP > 0x10FFFF) {
			throw new RangeError('Invalid code point ' + Object.prototype.toString.call(nextCP));
		}
		// 2.d. Append the elements of ! CodePointToUTF16CodeUnits(nextCP) to the end of elements.
		// elements = elements.concat(CodePointToUTF16CodeUnits(nextCP));
		// Polyfill.io - Retrieving the characters whilst iterating enables the function to work in a memory efficient and performant way.
		result.push(String.fromCharCode.apply(null, CodePointToUTF16CodeUnits(nextCP)));
	}
	// 3. Return the String value whose code units are, in order, the elements in the List elements. If codePoints is empty, the empty String is returned.
	return codePoints.length === 0 ? '' : result.join('');
});
