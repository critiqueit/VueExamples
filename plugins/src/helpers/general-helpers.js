export default {
	install: (Vue) => {
		Vue.prototype.$helpers = {
			arrayDifference(arrayA, arrayB) {
				(arrayA.length < arrayB.length) && (arrayB = [arrayA, arrayA = arrayB][0]);

				return arrayA.filter((x) => {
					return arrayB.indexOf(x) < 0;
				});
			}
		}
	}
}