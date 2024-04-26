<script lang="ts">
	export let amount: any
	export let onChangeAmount
	export let selectedCurrency: string
	export let onChangeCurrency
	export let currOptions: string[] = []
</script>

<div
	class="p-2 lg:p-0 lg:border-2 lg:border-zinc-800 hover:border-[#08A652] rounded-full lg:bg-neutral-100 lg:shadow lg:duration-200 lg:ease-in overflow-hidden"
>
	<input
		type="number"
		min="0"
		step="0.01"
		bind:value={amount}
		on:input={onChangeAmount}
		class="mr-2 lg:mr-0 p-2 text-lg lg:text-2xl border-2 border-transparent lg:border-zinc-800 focus:border-[#08A652] duration-200 ease-in lg:border-0 lg:border-r-2 rounded-full lg:rounded-none shadow lg:shadow-none"
	/>
	<select
		class="text-xl"
		bind:value={selectedCurrency}
		on:change={onChangeCurrency}
	>
		{#each currOptions as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>
