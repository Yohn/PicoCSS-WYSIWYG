export function createAccordionModal() {
  const modal = document.createElement('dialog');
  modal.classList.add('modal-lg')
  modal.innerHTML = `
    <article>
      <header>
        <button aria-label="Close" rel="prev" onclick="toggleModal(event);"></button>
        <h3>Insert Accordion</h3>
      </header>
      <input type="text" id="accordionTitle" placeholder="Accordion Title">
      <textarea id="accordionContent" placeholder="Accordion Content" rows="4"></textarea>
      <footer>
        <button id="cancelAccordion">Cancel</button>
        <button id="insertAccordionBtn">Insert</button>
      </footer>
    </article>
  `;
  return modal;
}