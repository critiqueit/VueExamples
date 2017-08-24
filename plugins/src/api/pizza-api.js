/**
 * Request data from some fancy api that returns the pizza's
 */
export default {
	getPizzas () {
		return [
			{ id: 1, name: 'Hawai' },
			{ id: 2, name: 'test2' },
			{ id: 3, name: 'Test3' },
		];
	},
	getToppings() {
		return  [
			{ id: 1, name: 'mozzarella' },
			{ id: 2, name: 'pineapple' },
			{ id: 3, name: 'olives' },
		];
	},
	getToppingMessages() {
		return [

		];
	}
};
