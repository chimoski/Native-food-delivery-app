export function currencyFormatter(num) {
	let string = num.toString().trim();
	let len = string.length;
	let arr = string.split("");
	let curr = "";
	let final;
	if (len < 4) return "₦ " + num;
	if (len === 4) {
		arr.forEach((el, i) => {
			if (i === 0) {
				el += ",";
			}
			curr += el;
		});
	}
	if (len === 5) {
		arr.forEach((el, i) => {
			if (i === 1) {
				el += ",";
			}
			curr += el;
		});
	}
	return (final = "₦ " + curr);
}
