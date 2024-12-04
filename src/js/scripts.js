// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

// List Collection Items (GET /collections/:collection_id/items)

document.addEventListener('DOMContentLoaded', () => {
	const changeImagesBtn = document.getElementById('changeImages');
	const originalImages = new Map(); // Copiloit suggested to use a map so I can re-refrence the images
	let imagesChanged = false;

	changeImagesBtn.addEventListener('click', () => {
		 const allImages = document.querySelectorAll('img:not(.logo):not(.social):not(.nav-bar-image)');
		 const newImageUrl = "./images/IMG_3375.jpeg";

		 allImages.forEach(img => {
			  if (!imagesChanged) {
					originalImages.set(img, img.src);
					img.src = newImageUrl;
					img.style.objectFit = 'cover';
			  } else {
					img.src = originalImages.get(img);
			  }
		 });


		 imagesChanged = !imagesChanged;

		 changeImagesBtn.textContent = imagesChanged ? 'Reset Images' : 'Change All Images';
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const virusButton = document.querySelector('.virus');
	const targetImage = document.querySelector('.virus-image');

	virusButton.addEventListener('click', () => {
		 targetImage.classList.add('virus-animation');

		 targetImage.addEventListener('animationend', () => {
			  targetImage.classList.remove('virus-animation');
		 });
	});
});
function matchIDToAuthor(author) {
	return fetch('js/teamMembers.json')
		.then(response => response.json())
		.then(data => {
			for (let i = 0; i < data.items.length; i++) {
				if (author == data.items[i].id) {
					return data.items[i].fieldData.name;
				}
			}
		});
}
const mainFrame = document.querySelectorAll(".main-frame-items");
const navFrame = document.querySelectorAll(".main-container")


function featuredArticles() {
	if (document.activeElement.attributes[0].nodeValue == "index") {
		fetch('js/articles.json')
			.then(response => response.json())
			.then(async (data) => { 
				for (let i = 0; i < data.items.length; i++) {
					if (data.items[i].fieldData.featured == true) {
						const name = data.items[i].fieldData.name;
						const summary = data.items[i].fieldData.postsummary;
						const image = data.items[i].fieldData['website-image'].url;
						const photo = `<img src="${encodeURI(image)}" class="article-image">`;


						const article = `
									<section class="article-box">
										 ${photo}
										 <div class="article-text">
											  <h2 class="name">${name}</h2>
											  <p>${summary}</p>

											  <div class = "featured">
											  <h3>Featured</h3>
										 </div>
									</section>
							  `;

						mainFrame[0].insertAdjacentHTML('beforeend', article);

					}

					addClickListenersToArticleTitles();
				}
			}

			)
	}
}
const articleBox = document.querySelectorAll(".article-box");

let backButtonAdded = false; // asked copiloit how I can check to do a single run if a class exists

function backB() {
    if (!backButtonAdded) {
        const backButton = "<button class='back-button' onclick='history.back()'>Back</button>";
        navFrame[0].attributes[0].ownerElement.childNodes[1].insertAdjacentHTML('afterbegin', backButton);
        backButtonAdded = true; // Set the flag to true after adding the button
    }
}
function backBAltTwo (){
    if (!backButtonAdded) {
        const backButton = "<button class='back-button' onclick='history.back()'>Back</button>";
        mainFrame[0].children[0].childNodes[3].insertAdjacentHTML('beforeend', backButton);
        backButtonAdded = false; // Set the flag to true after adding the button
    }
}
function backBAlt (){
	if (!backButtonAdded) {
		 const backButton = "<button class='back-button' onclick='history.back()'>Back</button>";
		 navFrame[0].attributes[0].ownerElement.childNodes[1].insertAdjacentHTML('beforeend', backButton);
		 backButtonAdded = true; // Set the flag to true after adding the button
	}
}
function addClickListenersToArticleTitles() {
	const articleTitles = document.querySelectorAll('.article-box');
	articleTitles.forEach(title => {
		title.addEventListener('click', (event) => {
			const clickedTitle = title.querySelector('.name').textContent;
			displayArticleContent(clickedTitle);
			const page = document.body.getAttribute('data-page');
			if (page === 'Articles') {
				 backBAlt();
			} else if (page === 'index') {
				 backB();

			}
		})

	});
};

function displayArticleContent(titleToMatch) {
	fetch('js/articles.json')
		.then(response => response.json())
		.then(async (data) => {
			const article = data.items.find(item =>
				item.fieldData.name === titleToMatch
			);

			if (article) {
				const author = await matchIDToAuthor(article.fieldData.author);
				const words = article.fieldData['article-text'];

				const content = `
                    <article class="full-article">
                        <h1>${article.fieldData.name}</h1>
                        <img src="${encodeURI(article.fieldData['website-image'].url)}"
                             class="article-full-image">
                        <div class="article-content">
                            <h2>By ${author}</h2>
                            <div class="article-body">
                                ${words}
                            </div>
                        </div>
                    </article>
                `;

				document.querySelector('.main-frame-items').innerHTML = content; // asked copilot to explain how to overwrite on the page
			}
		});
}

if (document.activeElement.attributes[0].nodeValue == "index") {
	featuredArticles();
}


if (document.activeElement.attributes[0].nodeValue == "Articles") {
	addArticles();
	backBAltTwo();


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
					<h2 class="name">${name}</h2>
					<h3>${author}</h3>
					<p> ${summary}</p>
				</div>`;
				mainFrame[0].insertAdjacentHTML('beforeend', [article])
			}
			addClickListenersToArticleTitles();
		})
}

if (document.activeElement.attributes[0].nodeValue == "Article Page") {
	addArticlePage();
}
document.addEventListener('DOMContentLoaded', () => {
	if (document.body.getAttribute('data-page') === "Teams") {
		 loadTeamMembers();
	}
	const showFeaturedButton = document.getElementById('show-featured');
	if (showFeaturedButton) {
		 showFeaturedButton.addEventListener('click', showFeaturedArticles);
	}
});

async function showFeaturedArticles() {
	const response = await fetch('js/articles.json');
	const data = await response.json();

	// asked chat how to clear the existing articles
	document.querySelector('.main-frame-items').innerHTML = '';

	// Filter and display featured articles
	for (const item of data.items) {
		 if (item.fieldData.featured) {
			  const name = item.fieldData.name;
			  const summary = item.fieldData.postsummary;
			  const image = item.fieldData['website-image'].url;
			  const photo = `<img src="${encodeURI(image)}" class="article-image">`;
			  const author = await matchIDToAuthor(item.fieldData.author);

			  const article = `
					<div class="featured">
						 <h3>Featured</h3>
					</div>
					<div class="article-box">
						 <article class="article-page">
							  ${photo}
							  <div class="article-text">
									<h2 class="name">${name}</h2>
									<h3>${author}</h3>
									<p>${summary}</p>
							  </div>
						 </article>
					</div>
			  `;

			  document.querySelector('.main-frame-items').insertAdjacentHTML('beforeend', article);
		 }
	}

	backBAlt();
	addClickListenersToArticleTitles();
}

async function loadTeamMembers() {
	const response = await fetch('js/teamMembers.json');
	const data = await response.json();

	for (const member of data.items) {
		 const authorArticles = await getAuthorArticles(member.id);

		 const teamMember = `
			  <div class="team-member-box">
					<div class="member-info">
						 <h2 class="member-name" data-author-id="${member.id}">${member.fieldData.name}</h2>
					</div>
					<div class="member-articles">
						 <h4>Articles by ${member.fieldData.name}</h4>
						 <div class="article-list">
							  ${authorArticles}
						 </div>
					</div>
			  </div>
		 `;
		 document.querySelector('.main-frame-items').insertAdjacentHTML('beforeend', teamMember);
	}
	addClickListenersToMemberArticles();
}

function getAuthorArticles(authorId) {
	return fetch('js/articles.json')
		.then(response => response.json())
		.then(data => {
			let articleHTML = '';
			const authorArticles = data.items.filter(item =>
				item.fieldData.author === authorId
			);

			authorArticles.forEach(article => {
				articleHTML += `
						 <div class="author-article">
							  <img src="${encodeURI(article.fieldData['website-image'].url)}"
									 class="article-thumbnail">
							  <div class="article-preview">
									<h2 class="name">${article.fieldData.name}</h2>
									<p>${article.fieldData.postsummary}</p>
							  </div>
						 </div>
					`;
			});

			return articleHTML || '<p>No articles published yet.</p>';
		});
}

function addClickListenersToMemberArticles() {
	const articleTitles = document.querySelectorAll('.member-articles .name');
	articleTitles.forEach(title => {
		title.addEventListener('click', (event) => {
			const clickedTitle = event.target.textContent;
			displayArticleContent(clickedTitle);
		});
	});
}






