import axios from 'axios';
import { fetchImg } from './fetch-img';
import { renderMarkUp } from './card-markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import getRefs from './refs-cards';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onInputSearch);
// refs.searchBtn.addEventListener('click', onBtnSearch);

function onInputSearch(e) {
	e.preventDefault();
	let itemToSearch = e.currentTarget.elements.searchQuery.value;
	console.log('🚀 ~ itemToSearch', itemToSearch);
	fetchImg(itemToSearch)
		.then(r => {
			if (!r.ok) {
				throw new Error(r.status);
			}
			return r.json();
		})
		.then(el => {
			renderMarkUp(el);
			console.log('🚀 ~ renderMarkUp(el)', renderMarkUp(el));
		});
}

// function onBtnSearch() {}
