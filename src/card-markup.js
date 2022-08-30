import getRefs from './refs-cards';
import './index';
const refs = getRefs();
export function renderMarkUp(card) {
	const cardResult = card.map(
		({ likes, userImageURL, views, comments, downloads }) => {
			return `<div class="photo-card">
	<img src=${userImageURL} alt="car related photo" loading="lazy" />
	<div class="info">
		<p class="info-item">
			<b>Likes ${likes}</b>
		</p>
		<p class="info-item">
			<b>Views ${views}</b>
		</p>
		<p class="info-item">
			<b>Comments ${comments}</b>
		</p>
		<p class="info-item">
			<b>Downloads ${downloads}</b>
		</p>
	</div>
</div>`;
		}
	);
	refs.galleryBox.insertAdjacentHTML('beforeend', cardResult.join(''));
}
