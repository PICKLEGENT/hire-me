<script lang="ts">
	import { onMount } from 'svelte'
	import Currency from './components/Currency.svelte'
	import { countries } from './constants'

	let currencyOptions: string[] = []
	let fromCurrency = ''
	let toCurrency = ''
	let fromAmount = 1
	let toAmount = 1
	let exchangeRate = 1

	const API_KEY = '3c1623ab6d621ddc0c91e7fd' // Не тырить

	const fetchData = async () => {
		try {
			const response = await fetch(
				`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/RUB`
			)
			const data = await response.json()

			currencyOptions = Object.keys(data.conversion_rates)
			fromCurrency = 'RUB'
			toCurrency = currencyOptions[0]
			exchangeRate = data.conversion_rates[toCurrency]
		} catch (error) {
			console.error(
				`Attention!!!
				Achtung!!!`,
				error
			)
		}
	}

	const convertCurrency = async () => {
		try {
			const response = await fetch(
				`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
			)
			const data = await response.json()

			exchangeRate = data.conversion_rates[toCurrency]
			toAmount = fromAmount * exchangeRate
		} catch (error) {
			console.error('Ошибка!!!', error)
		}
	}

	function handleFromCurrencyChange(event) {
		fromCurrency = event.target.value
		convertCurrency()
	}

	function handleToCurrencyChange(event) {
		toCurrency = event.target.value
		convertCurrency()
	}

	function handleFromAmountChange(event) {
		fromAmount = parseFloat(event.target.value)
		toAmount = fromAmount * exchangeRate
	}

	function handleToAmountChange(event) {
		toAmount = parseFloat(event.target.value)
		fromAmount = toAmount / exchangeRate
	}

	$: convertedAmount = toAmount.toFixed(2)

	let fromCurrencyName: string
	let toCurrencyName: string

	$: fromCurrencyName = countries[fromCurrency]
		? countries[fromCurrency].currencyName
		: fromCurrency
	$: toCurrencyName = countries[toCurrency]
		? countries[toCurrency].currencyName
		: toCurrency

	onMount(fetchData)
</script>

<main
	class="flex flex-col justify-center items-center px-4 py-8 lg:p-28 tracking-wide"
>
	<h1
		class="px-4 py-2 text-center font-black text-2xl lg:text-6xl text-neutral-100 border-2 border-[#08A652] rounded-full"
	>
		AR23 | Конвертер валют
	</h1>

	<section class="mt-16">
		<div>
			<Currency
				amount={fromAmount}
				onChangeAmount={handleFromAmountChange}
				selectedCurrency={fromCurrency}
				onChangeCurrency={handleFromCurrencyChange}
				currOptions={currencyOptions}
			/>
		</div>
		<div class="mt-8">
			<Currency
				amount={convertedAmount}
				onChangeAmount={handleToAmountChange}
				selectedCurrency={toCurrency}
				onChangeCurrency={handleToCurrencyChange}
				currOptions={currencyOptions}
			/>
		</div>
	</section>

	<div
		class="mt-8 lg:mt-16 text-2xl lg:text-4xl text-neutral-100 text-center leading-relaxed"
	>
		<span class="one lg:mr-3 relative">1</span>
		<span class="font-bold text-[#21BA72]">{fromCurrencyName}</span>
		к
		<span class="font-bold text-[#42E3B4]">{toCurrencyName}</span>
		= {#if exchangeRate < 1}
			<span class="font-bold text-[#FF0066]">{exchangeRate}</span>
		{:else if exchangeRate < 50}
			<span class="font-bold text-[#FF8000]">{exchangeRate}</span>
		{:else if exchangeRate < 100}
			<span class="font-bold text-[#08A652]">{exchangeRate}</span>
		{:else if exchangeRate > 100}
			<span class="font-bold text-[#FAED00]">{exchangeRate}</span>
		{/if}
	</div>
</main>

<style lang="css">
	@media (min-width: 1024px) {
		.one::before {
			content: '';
			position: absolute;
			top: 0.04em;
			left: -0.33em;
			width: 1.25em;
			height: 1.25em;
			border: 2px solid #08a652;
			border-radius: 100%;
		}
	}
</style>
