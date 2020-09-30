// 10.1.3 Static Semantics: UTF16SurrogatePairToCodePoint ( lead, trail )
function UTF16SurrogatePairToCodePoint(lead, trail) {// eslint-disable-line no-unused-vars
	// 1. Assert: lead is a leading surrogate and trail is a trailing surrogate.
	// Assert(isLeadingSurrogate(lead) && isTrailingSurrogate(trail));
	// 2. Let cp be (lead - 0xD800) × 0x400 + (trail - 0xDC00) + 0x10000.
	var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	// 3. Return the code point cp.
	return cp;
}
