export default class CardApiService {
	constructor() {
		this.itemToSearch = '';
		this.page = 1;
	}

	fetchCards() {
		return fetch(
			`https://pixabay.com/api/?key=29569004-5893c866d4c3e100c8eb9cd76&q=${this.itemToSearch}&
            image_type=photo&
            orientation=horizontal&
            safesearch=true&page=${this.page}&per_page=40`
		)
			.then(r => {
				if (!r.ok) {
					throw new Error(r.status);
				}
				return r.json();
			})
			.then((data) => {
				
				this.page += 1;
				return data;
			});
	}
	resetPage() {
		this.page = 1;
	}
	get search() {
		return this.itemToSearch;
	}

	set search(newSearch) {
		this.itemToSearch = newSearch;
	}
}
