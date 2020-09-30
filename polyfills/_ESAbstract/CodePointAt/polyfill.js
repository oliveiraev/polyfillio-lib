/* global UTF16SurrogatePairToCodePoint */
var CodePointAt = (function(){ // eslint-disable-line no-unused-vars
	function isLeadingSurrogate(cp){
		return cp >= 0xD800 && cp <= 0xDBFF;
	}
	function isTrailingSurrogate(cp){
		return cp >= 0xDC00 && cp <= 0xDFFF;
	}
	// 10.1.4 Static Semantics: CodePointAt ( string, position )
	return function CodePointAt(string, position) {
		// 1 .Let size be the length of string.
		var size = string.length;
		// 2. Assert: position ≥ 0 and position < size.
		// Assert(position >= 0 && position < size);
		// 3. Let first be the code unit at index position within string.
		var first = string.charCodeAt(position);
		// 4. Let cp be the code point whose numeric value is that of first.
		var cp = first;
		// 5. If first is not a leading surrogate or trailing surrogate, then
		if (!isLeadingSurrogate(first) && !isTrailingSurrogate(first)) {
			// a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: false }.
			return {
				CodePoint: cp,
				CodeUnitCount: 1,
				IsUnpairedSurrogate: false
			};
		}
		// 6. If first is a trailing surrogate or position + 1 = size, then
		if (isTrailingSurrogate(first) || position + 1 === size) {
			// a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
			return {
				CodePoint: cp,
				CodeUnitCount: 1,
				IsUnpairedSurrogate: true
			};
		}
		// 7. Let second be the code unit at index position + 1 within string.
		var second = string.charCodeAt(position + 1);
		// 8. If seconds is not a trailing surrogate, then
		if (!isTrailingSurrogate(second)) {
			// a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
			return {
				CodePoint: cp,
				CodeUnitCount: 1,
				IsUnpairedSurrogate: true
			};
		}
		// 9. Set cp to ! UTF16SurrogatePairToCodePoint(first, second).
		cp = UTF16SurrogatePairToCodePoint(first, second);
		// 10. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 2, [[IsUnpairedSurrogate]]: false }.
		return {
			CodePoint: cp,
			CodeUnitCount: 2,
			IsUnpairedSurrogate: false
		};
	};
}())
