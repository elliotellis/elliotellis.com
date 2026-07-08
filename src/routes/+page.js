export async function load({ fetch, params }) {
	const res = await fetch(`http://eell.io.test/works.json`);
	const data = await res.json();
	return { data };
}