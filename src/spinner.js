const getSpinner = () => {
	const spinner = document.createElement('div');
	spinner.className = 'trinity-rings-spinner';

	spinner.innerHTML = `
    <div style="display: flex; height: 10vh; width: 10vw; justify-content: center; align-items: center; ">
        <div class="circle"></div>
	    <div class="circle"></div>
	    <div class="circle"></div>
    </div>
    `;

	return spinner;
};

export default getSpinner;
