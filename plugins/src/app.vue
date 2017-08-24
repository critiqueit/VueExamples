<template>
  <div>
    <select v-model="selectedType">
      <option value=""> Select a pizza type </option>
      <option v-for="type in pizzaTypes" :value="type.name" >{{ type.name }}</option>
    </select>

    <toppings @addTopping="addTopping" @removeTopping="removeTopping"></toppings>

    {{ pizza.type }}
    <div v-for="topping in pizza.toppings">
      {{ topping }}
    </div>
  </div>
</template>

<script>
  import pizzaApi from './api/pizza-api';
  import toppings from './components/select-toppings.vue'

  export default {
	  data: function () {
		  return {
			  pizza: {
			  	type: '',
          toppings: []
        },
			  pizzaTypes:[],
        selectedType: '',
			  selectedToppings: []
		  }
	  },
	  methods: {
		  addTopping: function(topping) {
        this.selectedToppings.push(topping);
		  },
      removeTopping: function (topping) {
	      this.selectedToppings.splice(this.selectedToppings.indexOf(topping), 1);
      }
	  },
    watch: {
	    selectedType: function () {
	  		this.pizza.type = this.selectedType;
      },
      selectedToppings: function () {
	  		this.pizza.toppings = this.selectedToppings;
      }
    },
    mounted: function () {
      this.pizzaTypes = pizzaApi.getPizzas();
    },
	  components: {
		  toppings: toppings
	  }
  }
</script>