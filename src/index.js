import { renderMarkUp } from './card-markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './refs-cards';
import CardApiService from './search-service';
import CardApiService from './search-service';
import SimpleLightbox from 'simplelightbox';
import getSpinner from './spinner';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';

const refs = getRefs();
const spinner = getSpinner();
const cardApiService = new CardApiService();
// const loadMoreButton = new LoadMoreButton({ selector: '[data-action="load-more]"'})

refs.searchForm.addEventListener('submit', onInputSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function appendSpinner() {
	refs.galleryBox.append(spinner);
}
async function onInputSearch(e) {
	e.preventDefault();
	hideBtn();
	clearMarkup();
	cardApiService.search = e.currentTarget.elements.searchQuery.value;

	cardApiService.resetPage();

	try {
		appendSpinner();
		const fetchResult = await cardApiService.fetchCards();
		if (fetchResult.data.totalHits === 0) {
			hideBtn();
			Notify.failure(
				'Sorry, there are no images matching your search query. Please try again.'
			);
			return;
		}
		renderMarkUp(fetchResult.data.hits);
		Notify.info(`Hooray! We found ${fetchResult.data.totalHits} images.`);
		lightbox.refresh();
	} catch (error) {
		Notify.failure(`Sorry for that mistake it's not mine)))`);
	} finally {
		refs.loadMoreBtn.classList.remove('is-hidden');
		spinner.remove();
	}
}

async function onLoadMore() {
	try {
		appendSpinner();
		cardApiService.incrementPage();
		const fetchResult = await cardApiService.fetchCards();
		renderMarkUp(fetchResult.data.hits);
		lightbox.refresh();
		onScroll();
	} catch (error) {
		Notify.failure(`Sorry for that mistake it's not mine)))`);
	} finally {
		spinner.remove();
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

function hideBtn() {
	refs.loadMoreBtn.classList.add('is-hidden');
}
