export function createImageModal() {
  const modal = document.createElement('dialog');
  modal.classList.add('modal-lg')
  modal.innerHTML = `
    <article>
      <header>
        <h3>Insert Image</h3>
      </header>
      <input type="file" accept="image/*" id="imageUpload">
      <footer>
        <button id="cancelImage">Cancel</button>
        <button id="insertImageBtn">Insert</button>
      </footer>
    </article>
  `;
  return modal;
}

export function createTableModal() {
  const modal = document.createElement('dialog');
  modal.classList.add('modal-lg')
  modal.innerHTML = `
    <article>
      <header>
        <h3>Insert Table</h3>
      </header>
      <label>
        Rows: <input type="number" id="tableRows" value="3" min="1">
      </label>
      <label>
        Columns: <input type="number" id="tableCols" value="3" min="1">
      </label>
      <label>
        <input type="checkbox" id="stripedTable"> Striped Table
      </label>
      <footer>
        <button id="cancelTable">Cancel</button>
        <button id="insertTableBtn">Insert</button>
      </footer>
    </article>
  `;
  return modal;
}

export function createLinkModal() {
  const modal = document.createElement('dialog');
  modal.classList.add('modal-lg')
  modal.innerHTML = `
    <article>
      <header>
        <h3>Insert Link</h3>
      </header>
      <input type="url" id="linkUrl" placeholder="https://">
      <input type="text" id="linkText" placeholder="Link Text">
      <footer>
        <button id="cancelLink">Cancel</button>
        <button id="insertLinkBtn">Insert</button>
      </footer>
    </article>
  `;
  return modal;
}