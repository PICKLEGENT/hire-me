<script lang="ts">
	import { countries } from '../constants'

	export let amount: any
	export let onChangeAmount
	export let selectedCurrency: string
	export let onChangeCurrency
	export let currOptions: string[] = []
</script>

<div
	class="flex flex-col-reverse lg:flex-row p-2 lg:p-0 w-screen lg:w-fit lg:border-2 lg:border-zinc-800 hover:border-[#08A652] lg:rounded-full lg:bg-neutral-100 lg:shadow lg:duration-200 lg:ease-in overflow-hidden"
>
	<input
		type="number"
		min="0"
		step="0.01"
		bind:value={amount}
		on:input={onChangeAmount}
		class="mt-4 lg:mt-0 p-2 text-lg lg:text-xl border-2 border-transparent lg:border-zinc-800 focus:border-[#08A652] duration-200 ease-in lg:border-0 lg:border-r-2 rounded-full lg:rounded-none shadow lg:shadow-none"
	/>
	<select
		class="text-lg lg:text-xl"
		bind:value={selectedCurrency}
		on:change={onChangeCurrency}
	>
		{#each currOptions as option}
			<option value={option}
				>{countries[option] ? countries[option].currencyName : option}</option
			>
		{/each}
	</select>
</div>

<style lang="css">
	@media (max-width: 1024px) {
		select {
			padding: 8px;
			border-radius: 9999px;
			background-color: #f5f5f5;
			appearance: none;
		}
		select:focus {
			box-shadow: 0 0 0 2px #42e3b4;
			transition: 0.2s ease-in 0s;
		}
		select option:checked {
			background-color: #0087cd;
		}
	}
</style>
