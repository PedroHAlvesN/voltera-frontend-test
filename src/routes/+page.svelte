<script lang="ts">
	import { goto } from '$app/navigation';

	type Response = {
		age: number;
		count: number;
		name: string;
	};

	export let data: {
		response?: Response;
	};

	let name = data.response ? data.response.name : '';
	let delayId: number | undefined = undefined;
	let loading = false;

	function updateURL() {
		if (name == '') return;

		loading = true;

		if (delayId) {
			clearTimeout(delayId);
		}

		delayId = setTimeout(() => {
			loading = false;
			goto(`/?name=${name}`);
		}, 1000);
	}
</script>

<div class="container">
	<h1>Digite um <b>nome</b></h1>
	<input type="text" bind:value={name} on:input={updateURL} placeholder="Nome" />
	{#if loading}
		<div class="spinner"></div>
	{:else if data.response}
		<div class="response">
			<b>Nome: {data.response.name}</b>
			<b>Idade: {data.response.age}</b>
			<b>Quantidade: {data.response.count}</b>
		</div>
	{:else}
		<b class="placeholder">Os resultados aparecerão aqui.</b>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 50px;
		height: 380px;
		width: 800px;
		margin: 0 auto;
		background-color: #2f1e27;
		box-shadow: 0 0 60px rgba(0, 0, 0, 0.8);
		border: 2px solid #02b995;
		border-radius: 25px;

		& h1 {
			color: #fff;
			font-weight: 100;
			font-size: 42px;
			margin-bottom: 40px;
		}

		& b {
			font-weight: bold;
			color: #02b995;
		}

		& input {
			padding: 10px;
			height: 40px;
			width: 300px;
			font-size: 16px;
			border: none;
			border-radius: 4px;
			color: var(--primary-color);
			padding: 0 25px 0 25px;
			border-radius: 25px;
			text-align: center;
			margin-bottom: 50px;
			text-transform: capitalize;

			&:focus {
				outline: none;
				box-shadow: 0 0 5px rgba(10, 59, 111, 0.5);
			}
		}

		& .spinner {
			width: 40px;
			height: 40px;
			border: 4px solid #fff;
			border-top-color: #02b995;
			border-radius: 50%;
			animation: spin 1s linear infinite;
			margin: 2rem auto;
		}

		& .response {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 300px;
			gap: 10px;
			margin: 0 auto;
			color: #fff;
			font-size: 25px;
			font-weight: 100;

			& b:nth-of-type(1) {
				text-transform: capitalize;
			}
		}

		& .placeholder {
			font-size: 20px;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
