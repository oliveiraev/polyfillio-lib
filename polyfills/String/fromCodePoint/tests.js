
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(String.fromCodePoint);
});

it('has correct arity', function () {
	proclaim.arity(String.fromCodePoint, 1);
});

it('has correct name', function () {
	proclaim.hasName(String.fromCodePoint, 'fromCodePoint');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String, 'fromCodePoint');
});

it('returns empty string if called with no arguments', function () {
	proclaim.strictEqual(String.fromCodePoint(), '');
});

it('throws when called with a string which is not a number', function () {
	proclaim["throws"](function () {
		String.fromCodePoint('_');
	}, RangeError);
});

it('throws when called with a string which is positive infinity', function () {
	proclaim["throws"](function () {
		String.fromCodePoint('+Infinity');
	}, RangeError);
});

it('throws when called with a string which is negative infinity', function () {
	proclaim["throws"](function () {
		String.fromCodePoint('-Infinity');
	}, RangeError);
});

it('throws when called with a negative number', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(-1);
	}, RangeError);
});

it('throws when called with a number which is beyond the codepoint space', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(0x10FFFF + 1);
	}, RangeError);
});

it('throws when called with a non integer number', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(3.14);
	}, RangeError);
});

it('throws when called with a non integer number', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(3e-2);
	}, RangeError);
});

it('throws when called with negative infinity', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(-Infinity);
	}, RangeError);
});

it('throws when called with positive infinity', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(Infinity);
	}, RangeError);
});

it('throws when called with NaN', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(NaN);
	}, RangeError);
});

it('throws when called with undefined', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(undefined);
	}, RangeError);
});

it('throws when called with an object', function () {
	proclaim["throws"](function () {
		String.fromCodePoint({});
	}, RangeError);
});

it('throws when called with a regular expression', function () {
	proclaim["throws"](function () {
		String.fromCodePoint(/./);
	}, RangeError);
});

it('returns "\0" if called with an empty string', function () {
	proclaim.strictEqual(String.fromCodePoint(''), '\0');
});

it('returns "\0" if called with negative 0', function () {
	proclaim.strictEqual(String.fromCodePoint(-0), '\0');
});

it('returns "\0" if called with positive 0', function () {
	proclaim.strictEqual(String.fromCodePoint(0), '\0');
});

it('returns "\0" if called with false', function () {
	proclaim.strictEqual(String.fromCodePoint(false), '\0');
});

it('returns "\0" if called with null', function () {
	proclaim.strictEqual(String.fromCodePoint(null), '\0');
});

it('handles astral codepoints', function(){
	proclaim.strictEqual(String.fromCodePoint(0x1D306), '\uD834\uDF06');
	proclaim.strictEqual(String.fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07');
	proclaim.strictEqual(String.fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07');
});

it('calls valueOf on the passed in argument', function () {
	this.timeout(10000);

	var tmp = 0x60;
	proclaim.strictEqual(String.fromCodePoint({
		valueOf: function () {
			return ++tmp;
		}
	}), 'a');
	proclaim.strictEqual(tmp, 0x61);
});

it('does not throw on long argument lists', function () {
	proclaim.doesNotThrow(function () {
		var result = [];
		// one code unit per item in array
		for (var i = 0; i < 49152; i++) {
			result.push(0);
		}
		String.fromCodePoint.apply(null, result);
	});
	proclaim.doesNotThrow(function () {
		var result = [];
		// two code units per item in array
		for (var i = 0; i < 49152; i++) {
			result.push(0xFFFF + 1);
		}
		String.fromCodePoint.apply(null, result);
	});
});
