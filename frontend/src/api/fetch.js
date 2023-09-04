const api = async (url, method = "GET", data = undefined) => {
	try {
		const request = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return await request.json();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { fetch: api };
