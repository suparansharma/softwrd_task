export async function fetchLandpads() {
	try {
		const response = await fetch('https://api.spacexdata.com/v3/landpads');
		if (!response.ok) {
			throw new Error('Failed to fetch landpads data');
		}
		return await response.json();
	} catch (error) {
		throw new Error(error.message || 'An error occurred while fetching data.');
	}
}
