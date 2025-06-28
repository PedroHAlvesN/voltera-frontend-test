export async function load({ fetch, url }) {
	const name = url.searchParams.get('name');

	if (name && name.length > 0) {
		const response = await fetch(`https://api.agify.io?name=${name}`);

		const data = await response.json();
		return { response: data };
	}

	return undefined;
}
