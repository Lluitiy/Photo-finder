import axios from 'axios';

export function fetchImg(name) {
	return fetch(
		`https://pixabay.com/api/?key=29569004-5893c866d4c3e100c8eb9cd76&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
	);
}
