import { renderMarkUp } from './card-markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './refs-cards';
import CardApiService from './search-service';
import CardApiService from './search-service';
import SimpleLightbox from 'simplelightbox';
import LoadMoreButton from './load-more-btn';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';

const refs = getRefs();
const cardApiService = new CardApiService();
// const loadMoreButton = new LoadMoreButton({ selector: '[data-action="load-more]"'})

refs.searchForm.addEventListener('submit', onInputSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onInputSearch(e) {
	e.preventDefault();
	clearMarkup();
	cardApiService.search = e.currentTarget.elements.searchQuery.value;

	cardApiService.resetPage();
	cardApiService.fetchCards().then(card => {
		if (card.totalHits === 0) {
			refs.loadMoreBtn.classList.add('is-hidden');
			Notify.failure(
				'Sorry, there are no images matching your search query. Please try again.'
			);

			return;
		}
		renderMarkUp(card.hits);
		Notify.info(`Hooray! We found ${card.totalHits} images.`);
		refs.loadMoreBtn.classList.remove('is-hidden');
		lightbox.refresh();
	});
}

function onLoadMore() {
	cardApiService.fetchCards().then(card => {
		renderMarkUp(card.hits);
		lightbox.refresh();
		emptySearch();
	});
}

function clearMarkup() {
	refs.galleryBox.innerHTML = '';
}

var lightbox = new SimpleLightbox('.gallery a', {
	captionsData: 'alt',
	captionDelay: 250,
	captionPosition: 'outside',
	animationSpeed: 250,
	disableRightClick: true,
	disableScroll: true,
	scrollZoom: false,
});
