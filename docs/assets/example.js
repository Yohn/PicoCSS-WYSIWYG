// Example POST method implementation: from Mozilla
async function postData(url = "", data = {}) {
	// Default options are marked with *
	const formData = new FormData()
	Object.entries(data).forEach(([key, value]) => {
		formData.append(key, value);
	});
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		body: formData, // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

document.addEventListener("DOMContentLoaded", function() {

	const WYSIWYGOpen = {
		opened: null
	}

	// Handle edit block button click
	document.querySelectorAll('.btn-edit-block').forEach((btn) => {
		btn.addEventListener('click', function () {
			const bid = this.dataset.blockId;
			const block = this.dataset.which;
			const editorContainer = document.querySelector(block);
			const content = editorContainer.innerHTML;

			this.classList.add('hide');
			this.parentElement.querySelector('.btn-save-block').classList.remove('hide');

			editorContainer.innerHTML = '';
			if(WYSIWYGOpen.opened) {
				WYSIWYGOpen.opened.removeEventListeners();
			}
			WYSIWYGOpen.opened = new WYSIWYGEditor(editorContainer);
			WYSIWYGOpen.opened.setContent(content);
			//this.parentElement.innerHTML = '<i class="bi bi-check-lg"></i> Update Text';
		});
	});

	// Save text block
	document.querySelectorAll('.btn-save-block').forEach((btn) => {
		btn.addEventListener('click', async function () {
			const htmlContent = WYSIWYGOpen.opened.getContent('html');
			const output = this.dataset.which
			const payload = {
				action: 'dash',
				bid: this.dataset.blockId,
				txt: htmlContent,
			};
			//const response = await postData('/ajax.php', payload);
			//if (response.status == 'error') {
			//	document.querySelector(output).innerHTML = response.message;
			//} else {
				this.classList.add('hide');
				this.parentElement.querySelector('.btn-edit-block').classList.remove('hide');
				document.querySelector(output).innerHTML = '';
				WYSIWYGOpen.opened.removeEventListeners();
				setTimeout(() => {
					window.location.reload();
				}, 1500);
				//document.querySelector(btn.dataset.which).innerHTML = text.value;
				//closeModal(document.getElementById('edit_text_modal'))//.hide();
			//}
		});
	});
})