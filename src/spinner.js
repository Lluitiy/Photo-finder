const getSpinner = () => {
	const spinner = document.createElement('div');
	spinner.className = 'fingerprint-spinner';

	spinner.innerHTML = `
    <div position: fixed; display: left: 100; flex; height: 10vh; width: 10vw; justify-content: center; align-items: center;  ">
        <div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
		<div class="spinner-ring"></div>
    </div>
    `;

	return spinner;
};

export default getSpinner;
