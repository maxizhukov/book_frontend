export let url = "https://api.corplife.at/v0/"

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	// dev code for server
	url = "http://localhost:5000/api/"
} else {
	// production code
	url = "http://localhost:5000/api/"
}
