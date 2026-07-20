export async function load({ fetch, params }) {
	const res = await fetch(`https://eell.io/works.json`);
	const data = await res.json();
	return { data };
}