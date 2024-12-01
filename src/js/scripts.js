// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

// List Collection Items (GET /collections/:collection_id/items)

function matchIDToAuthor(author) {
	return fetch('js/teamMembers.json')
		 .then(response => response.json())
		 .then(data => {
			  for (let i = 0; i < data.items.length; i++) {
					if (author == data.items[i].id) {
						 return data.items[i].fieldData.name;
					}
		 }});
}
const mainFrame = document.querySelectorAll(".main-frame-items");
function featuredArticles() {
	if (document.activeElement.attributes[0].nodeValue == "index") {
		 fetch('js/articles.json')
			  .then(response => response.json())
			  .then(async (data) => {  // Make this callback async
					for (let i = 0; i < 20; i++) {
						 if (data.items[i].fieldData.featured == true) {
							  const name = data.items[i].fieldData.name;
							  const summary = data.items[i].fieldData.postsummary;
							  const image = data.items[i].fieldData['website-image'].url;
							  const photo = `<img src="${encodeURI(image)}" class="article-image">`;

							  // Wait for the author name to be fetched
							  const author = await matchIDToAuthor(data.items[i].fieldData.author);

							  const article = `<a class="target"  href="./Articles.html">
									<section class="article-box">
										 ${photo}
										 <div class="article-text">
											  <h2>${name}</h2>
											  <p>${summary}</p>
											  <h3>${author}</h3>
										 </div>
									</section>
							  </a>`;
							  mainFrame[0].insertAdjacentHTML('beforeend', article);
						 }
					}
			  });
	}
}

/*if (author == teamData.items[i].id) {
	return authorData.items[i].fieldData.author = teamData.items[i].id;
}
console.log('end of loop');
}
}
*/

if (document.activeElement.attributes[0].nodeValue == "index") {
	featuredArticles();
}

if (document.activeElement.attributes[0].nodeValue == "Articles") {
	addArticles();
}
function addArticles() {
	fetch('js/articles.json')
		.then(response => response.json())
		.then(async (data) => {
			for (let i = 0; i < 20; i++) {
				const name = data.items[i].fieldData.name;
				const summary = data.items[i].fieldData.postsummary;
				const image = data.items[i].fieldData['website-image'].url;
				const photo = `<img src="${encodeURI(image)}" class="article-image">`;
				const author = await matchIDToAuthor(data.items[i].fieldData.author);
				const article = `
		<div class="article-box">
			<article class="article-page">
				${photo}
				<div class="article-text">
					<h2>${name}</h2>
					<h3>${author}</h3>
					<p> ${summary}</p>
				</div>`;
				mainFrame[0].insertAdjacentHTML('beforeend', [article])
			}
		})
}

if (document.activeElement.attributes[0].nodeValue == "Article Page") {
	addArticlePage();
}


/*CODE FOR THE AUTHOR SEARCH TO BE DONE IN EACH ARTICLE
let author = data.items[i].fieldData.author;
fetch('js/team members.json')
.then(response => response.json())
.then((data)=> {
	for (let j = 0; j <= data.items.length; j++){
		if (author == data.items[j].id) {
			author = data.items[j].name;
			console.log(author);
			return;
		} else {
			author = "Anonymous";
		}
	}
})

/*fetch('js/articles.json')
.then(response => response.json())
.then((data) => {
for (let i = 0; i < 20; i++) {
if (data.items[i].fieldData.featured ==true) {
 const name = data.items[i].fieldData.name;
 const summary = data.items[i].fieldData.postsummary;
 const image = data.items[i].fieldData['website-image'].url;
 const photo = `<img src="${encodeURI(image)}" class="article-image">`;
 console.log(photo);
 const article = `<a class="target" target="_blank" href="./Articles.html">
	<section class="article-box">
	  ${photo}
	  <div class="article-text">
		 <h2>${name}</h2>
		 <p>${summary}</p>
	  </div>
	</section>
 </a>`;
 mainFrame[0].insertAdjacentHTML('beforeend', article);
}
}

}) */




//function addArticle(article){
//article = webflowArticleHead;


//console.log(article);




