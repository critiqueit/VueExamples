<template>
    <div>
        <div v-for="choice in choices">
            <label for="choice.name">{{ choice.name }}</label>
            <input type="checkbox" id="choice.id" :value="choice.name" v-model="selectedToppings" />
        </div>
    </div>
</template>
<script>
    import pizzaApi from '../api/pizza-api';

    export default {
        data: function () {
        	return {
        		choices: [],
            selectedToppings: [],
          }
        },
        watch: {
	        selectedToppings: function(newValue, oldValue) {
	        	let values = this.$helpers.arrayDifference(newValue, oldValue);

	        	if (newValue.length > oldValue.length) {
	        		values.forEach(value => {
				        this.$emit('addTopping', value);
              });

			        return;
		        }

		        values.forEach(value => {
			        this.$emit('removeTopping', value);
		        });
          }
        },
        mounted: function () {
          this.choices = pizzaApi.getToppings();
        }
    }
</script>
