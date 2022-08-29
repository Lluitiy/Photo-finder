import './css/styles.css';
import { fetchImg } from './fetch-img';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
	searchForm: document.querySelector('.search-form'),
	searchFormInput: document.querySelector('input'),
	searchBtn: document.querySelector('button'),
};

refs.searchForm.addEventListener('imput', onInputSearch);
refs.searchBtn.addEventListener('submit', onBtnSearch);

function onInputSearch(e) {
    e.preventDefault()
}
function onBtnSearch(e) {
    
}
