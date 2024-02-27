const getAspectRatio = (width: number, height: number) => {
	const gcd = (...arr: number[]) => {
		const _gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
		return [...arr].reduce((a: number, b: number) => _gcd(a, b));
	};
	const gcdResult = gcd(...[width, height]);
	console.log(gcdResult);
	return `${width / gcdResult} / ${height / gcdResult}`;
};
