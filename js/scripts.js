// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

// List Collection Items (GET /collections/:collection_id/items)
console.log("hello I hate java");
fetch("https://api.webflow.com/v2/collections/659444784222b514c61ec51e/items", {
	method: "GET",
	headers: {
		"Authorization": "Bearer afce4a53636289c8974c979a405c9436d8c7ad728f04ab906a64678d13568259"
	},
}).then(response => response.json())
	.then(function (data) {

		console.log(data);

	});



