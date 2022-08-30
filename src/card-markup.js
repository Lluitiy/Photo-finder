import getRefs from './refs-cards';
import './index';
const refs = getRefs();
export function renderMarkUp(card) {
	const cardResult = card.map(
		({
			likes,
			webformatURL,
			views,
			comments,
			downloads,
			tags,
			largeImageURL,
		}) => {
			return `
<div class="photo-card">
	<a href='${largeImageURL}' class='photo-card__img' >
		<img src=${webformatURL} alt="${tags}" loading="lazy" width='360' height='240'/>
	</a>
		<div class="info">
			<p class="info-item">
				<b>Likes</b> ${likes}
			</p>
			<p class="info-item">
				<b>Views</b> ${views}
			</p>
			<p class="info-item">
				<b>Comments</b> ${comments}
			</p>
			<p class="info-item">
				<b>Downloads</b> ${downloads}
			</p>
		</div>
</div>`;
		}
	);
	refs.galleryBox.insertAdjacentHTML('beforeend', cardResult.join(''));
}
