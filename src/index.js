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

async function onInputSearch(e) {
	e.preventDefault();
	clearMarkup();
	cardApiService.search = e.currentTarget.elements.searchQuery.value;

	cardApiService.resetPage();

	try {
		const fetchResult = await cardApiService.fetchCards();
		if (fetchResult.data.totalHits === 0) {
			refs.loadMoreBtn.classList.add('is-hidden');
			Notify.failure(
				'Sorry, there are no images matching your search query. Please try again.'
			);

			return;
		}
		renderMarkUp(fetchResult.data.hits);
		Notify.info(`Hooray! We found ${fetchResult.data.totalHits} images.`);
		refs.loadMoreBtn.classList.remove('is-hidden');
		lightbox.refresh();
	} catch (error) {
		Notify.failure(`Sorry for that mistake it's not mine)))`);
	}
}

async function onLoadMore() {
	try {
		cardApiService.incrementPage();
		const fetchResult = await cardApiService.fetchCards();
		renderMarkUp(fetchResult.data.hits);
		lightbox.refresh();
		onScroll();
	} catch (error) {
		Notify.failure(`Sorry for that mistake it's not mine)))`);
	}
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
function onScroll() {
	const { height: cardHeight } = document
		.querySelector('.gallery')
		.firstElementChild.getBoundingClientRect();

	window.scrollBy({
		top: cardHeight * 2,
		behavior: 'smooth',
	});
}
