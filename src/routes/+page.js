import { PUBLIC_KIRBY_SERVER_URL } from '$env/static/public';
export async function load({ fetch, params }) {
	const res = await fetch(`${PUBLIC_KIRBY_SERVER_URL}/works.json`);
	const data = await res.json();
	return { data };
}