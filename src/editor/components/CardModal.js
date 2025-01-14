export function createCardModal() {
  const modal = document.createElement('dialog');
  modal.classList.add('modal-lg')
  modal.innerHTML = `
    <article>
      <header>
        <h3>Insert Card</h3>
      </header>
      <input type="text" id="cardHeader" placeholder="Card Header">
      <textarea id="cardBody" placeholder="Card Body" rows="4"></textarea>
      <input type="text" id="cardFooter" placeholder="Card Footer">
      <footer>
        <button id="cancelCard">Cancel</button>
        <button id="insertCardBtn">Insert</button>
      </footer>
    </article>
  `;
  return modal;
}