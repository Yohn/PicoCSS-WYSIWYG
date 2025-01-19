function createEmojiPicker() {
  const picker = document.createElement('div');
  picker.className = 'emoji-picker dropdown-menu';

  const commonEmojis = ['😀', '😂', '🥰', '😎', '🤔', '👍', '👎', '❤️', '⭐', '🔥'];

  picker.innerHTML = commonEmojis
    .map(emoji => `<button class="emoji-btn" data-emoji="${emoji}">${emoji}</button>`)
    .join('');

  return picker;
}

function createToolbar() {
	//const toolbar = document.createElement('div');
	//toolbar.className = 'editor-toolbar';
	const toolbar = document.createElement('header');
	toolbar.innerHTML = `
		<div role="group">
			<details class="dropdown">
				<summary class="outline" role="button" aria-haspopup="listbox"><span data-placement="bottom" data-tooltip="Header Text, Quotes, Paragraph tags">Header &amp; Blocks</span></summary>
				<ul role="listbox">
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="h1"><h1>Heading 1</h1></a></li>
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="h2"><h2>Heading 2</h2></a></li>
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="h3"><h3>Heading 3</h3></a></li>
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="h4"><h4>Heading 4</h4></a></li>
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="h5"><h5>Heading 5</h5></a></li>
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="h6"><h6>Heading 6</h6></a></li>
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="p">Paragraph</a></li>
					<li><a href="javascript:void(0);" data-command="formatBlock" data-value="blockquote"><blockquote style="margin-block:0;">Blockquote</blockquote></a></li>
				</ul>
			</details>

			<details class="dropdown">
				<summary class="outline" role="button" aria-haspopup="listbox"><span data-placement="bottom" data-tooltip="Change font style"><i class="bi bi-fonts"></i></span></summary>
				<ul role="listbox">
					<li><a href="javascript:void(0);" data-command="fontName" data-value="Arial" style="font-family:Arial;">Arial</a></li>
					<li><a href="javascript:void(0);" data-command="fontName" data-value="Times New Roman" style="font-family:Times New Roman;">Times New Roman</a></li>
					<li><a href="javascript:void(0);" data-command="fontName" data-value="Courier New" style="font-family:Courier New;">Courier New</a></li>
				</ul>
			</details>

			<details class="dropdown">
				<summary class="outline" role="button" aria-haspopup="listbox"><span data-placement="bottom" data-tooltip="Insert Emoji"><i class="bi bi-emoji-smile"></i></span></summary>
				<ul role="listbox" class="emoji-menu" dir="rtl">
					${createEmojiPicker().innerHTML}
				</ul>
			</details>
		</div>
		<nav>
			<ul>
				<li>
					<div role="group">
						<button class="outline" data-command="bold" data-tooltip="Bold"><i class="bi bi-type-bold"></i></button>
						<button class="outline" data-command="italic" data-tooltip="Italic"><i class="bi bi-type-italic"></i></button>
						<button class="outline" data-command="underline" data-tooltip="Underline"><i class="bi bi-type-underline"></i></button>
					</div>
				</li>
			</ul>
			<ul>
				<li>
					<div role="group">
						<button class="outline" data-command="justifyLeft" data-tooltip="Align Left"><i class="bi bi-text-left"></i></button>
						<button class="outline" data-command="justifyCenter" data-tooltip="Align Center"><i class="bi bi-text-center"></i></button>
						<button class="outline" data-command="justifyRight" data-tooltip="Align Right"><i class="bi bi-text-right"></i></button>
						<button class="outline" data-command="justifyFull" data-tooltip="Justify"><i class="bi bi-justify"></i></button>
					</div>
				</li>
			</ul>
			<ul>
				<li>
					<div role="group">
						<button class="outline" data-command="insertUnorderedList" data-tooltip="Bullet List"><i class="bi bi-list-ul"></i></button>
						<button class="outline" data-command="insertOrderedList" data-tooltip="Numbered List"><i class="bi bi-list-ol"></i></button>
						<button class="outline" data-command="insertHorizontalRule" data-tooltip="Horizontal Line"><i class="bi bi-dash-lg"></i></button>
					</div>
				</li>
			</ul>
		</nav>
		<nav>
			<ul>
				<li>
					<div role="group">
						<button class="outline" data-action="viewSource" data-tooltip="View Source"><i class="bi bi-code-slash"></i></button>
					</div>
				</li>
			</ul>
			<ul>
				<li>
					<div role="group">
						<button class="outline" data-action="insertCard" data-tooltip="Insert Card"><i class="bi bi-card-text"></i></button>
						<button class="outline" data-action="insertAccordion" data-tooltip="Insert Accordion"><i class="bi bi-chevron-down"></i></button>
						<button class="outline" data-action="insertImage" data-tooltip="Insert Image"><i class="bi bi-image"></i></button>
						<button class="outline" data-action="insertTable" data-tooltip="Insert Table"><i class="bi bi-table"></i></button>
						<button class="outline" data-action="insertLink" data-tooltip="Insert Link"><i class="bi bi-link"></i></button>
					</div>
				</li>
			</ul>
			<ul>
				<li>
					<div role="group">
						<button class="outline" data-action="undo" data-tooltip="Undo"><i class="bi bi-arrow-counterclockwise"></i></button>
						<button class="outline" data-action="redo" data-tooltip="Redo"><i class="bi bi-arrow-clockwise"></i></button>
					</div>
				</li>
			</ul>
		</nav>
	`;
	return toolbar;
}

function createImageModal() {
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

function createTableModal() {
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

function createLinkModal() {
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

function createCardModal() {
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

function createAccordionModal() {
  const modal = document.createElement('dialog');
  modal.classList.add('modal-lg')
  modal.innerHTML = `
    <article>
      <header>
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

class History {
  constructor() {
    this.items = [];
    this.index = -1;
  }

  push(content) {
    this.index++;
    this.items = this.items.slice(0, this.index);
    this.items.push(content);
  }

  undo() {
    if (this.index > 0) {
      this.index--;
      return this.items[this.index];
    }
    return null;
  }

  redo() {
    if (this.index < this.items.length - 1) {
      this.index++;
      return this.items[this.index];
    }
    return null;
  }
}

// Helper method: Pretty print HTML
function prettyPrintHTML(html) {
  // Remove any leading/trailing whitespace
  html = html.trim();

  // If the HTML is empty, return empty string
  if (!html) return '';

  function format(node, level) {
    let indentBefore = new Array(level++ + 1).join('  ');
    let indentAfter = new Array(level - 1).join('  ');
    let text = '';

    // Handle text nodes
    if (node.nodeType === 3) {
      let content = node.textContent.trim();
      return content ? indentBefore + content + '\n' : '';
    }

    // Handle element nodes
    if (node.nodeType === 1) {
      // Skip the wrapper div we used for parsing
      if (node === parser && node.children.length === 1) {
        return Array.from(node.childNodes)
          .map(child => format(child, level - 1))
          .join('');
      }

      text += indentBefore + '<' + node.nodeName.toLowerCase();

      // Add attributes
      Array.from(node.attributes).forEach(attr => {
        text += ' ' + attr.name + '="' + attr.value + '"';
      });

      if (node.childNodes.length === 0) {
        // Self-closing tags
        text += ' />\n';
      } else {
        text += '>\n';

        // Process child nodes
        Array.from(node.childNodes).forEach(child => {
          text += format(child, level);
        });

        text += indentAfter + '</' + node.nodeName.toLowerCase() + '>\n';
      }

      return text;
    }

    return '';
  }

  // Create a temporary container for parsing
  const parser = document.createElement('div');
  parser.innerHTML = html;

  // Process all root nodes
  return Array.from(parser.childNodes)
    .map(node => format(node, 0))
    .join('')
    .trim();
}

class WYSIWYGEditor {
  constructor(container) {
    this.container = container;
    this.history = new History();
    this.turndownService = new TurndownService();
    this.init();
  }

  init() {
    // Create toolbar
    this.toolbar = createToolbar();
    this.container.appendChild(this.toolbar);

    // Create editable content area
    this.editor = document.createElement('div');
    this.editor.className = 'editor-content';
    this.editor.contentEditable = true;
    this.container.appendChild(this.editor);

    // Create modals
    this.cardModal = createCardModal();
    this.accordionModal = createAccordionModal();
    this.imageModal = createImageModal();
    this.tableModal = createTableModal();
    this.linkModal = createLinkModal();

		//const modalContainerEle = document.getElementById('modalContainer');
		//if (modalContainerEle) {
			//WYSIWYGEditor(modalContainerEle.dataset.editor).removeEventListeners();
			//modalContainerEle.remove();
		//}
    this.modalContainer = document.createElement('div');
    this.modalContainer.id = 'modalContainer';
		this.modalContainer.dataset.editor = this.container.id;

    this.modalContainer.appendChild(this.cardModal);
    this.modalContainer.appendChild(this.accordionModal);
    this.modalContainer.appendChild(this.imageModal);
    this.modalContainer.appendChild(this.tableModal);
    this.modalContainer.appendChild(this.linkModal);
		document.body.appendChild(this.modalContainer);
    // Setup event listeners
    this.setupEventListeners();
  }

  /**
	 * Checks if there is a selection or if the cursor is within the editor.
	 * If not, moves the cursor to the end of the editor.
	 * Returns the range of the current selection or a range at the end of the editor.
	 */
	getRangeOrSetToEnd() {
		const selection = window.getSelection();

		// Ensure the editor is focused
		this.editor.focus();

		// Check if selection is within the editor
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			if (this.editor.contains(range.commonAncestorContainer)) {
				return range; // Return existing range if within the editor
			}
		}

		// If no valid range, create a new range at the end of the editor
		const range = document.createRange();
		range.selectNodeContents(this.editor);
		range.collapse(false); // Move to the end
		selection.removeAllRanges();
		selection.addRange(range);
		return range;
	}

  setupEventListeners() {
    // Toolbar command buttons
    this.toolbar.querySelectorAll('[data-command]').forEach(button => {
      button.addEventListener('click', (e) => {
        const command = e.target.closest('[data-command]').dataset.command;
        const value = e.target.closest('[data-command]').dataset.value || '';
        this.execCommand(command, value);
      });
    });

    // Special buttons
    const handleAction = (action) => {
      return () => {
        this.range = this.getRangeOrSetToEnd();
        action.call(this);
      };
    };

    this.toolbar.querySelector('[data-action="insertCard"]').addEventListener('click', handleAction(this.handleCardInsert));
    this.toolbar.querySelector('[data-action="insertAccordion"]').addEventListener('click', handleAction(this.handleAccordionInsert));
    this.toolbar.querySelector('[data-action="insertImage"]').addEventListener('click', handleAction(this.handleImageInsert));
    this.toolbar.querySelector('[data-action="insertTable"]').addEventListener('click', handleAction(this.handleTableInsert));
    this.toolbar.querySelector('[data-action="insertLink"]').addEventListener('click', handleAction(this.handleLinkInsert));
    this.toolbar.querySelector('[data-action="undo"]').addEventListener('click', () => this.undo());
    this.toolbar.querySelector('[data-action="redo"]').addEventListener('click', () => this.redo());
    this.toolbar.querySelector('[data-action="viewSource"]').addEventListener('click', () => this.toggleSource());
    // Emoji picker
    this.toolbar.querySelectorAll('.emoji-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.execCommand('insertText', e.target.dataset.emoji);
      });
    });

    // Content change tracking
    this.editor.addEventListener('input', () => {
      this.history.push(this.editor.innerHTML);
    });
  }

  handleCardInsert() {
    this.cardModal.showModal();

    const cancelBtn = document.getElementById('cancelCard');
    const insertBtn = document.getElementById('insertCardBtn');

    const handleInsert = () => {
      const header = document.getElementById('cardHeader').value;
      const body = document.getElementById('cardBody').value;
      const footer = document.getElementById('cardFooter').value;

      const cardHtml = `
        <article>
          ${header ? `<header>${header}</header>` : ''}
          <div class="card-body">${body}</div>
          ${footer ? `<footer>${footer}</footer>` : ''}
        </article>
      `;

      this.insertContent(DOMPurify.sanitize(cardHtml));
      //this.execCommand('insertHTML', DOMPurify.sanitize(cardHtml));
      this.cardModal.close();
      cleanup();
    };

    const cleanup = () => {
      insertBtn.removeEventListener('click', handleInsert);
      cancelBtn.removeEventListener('click', handleCancel);
    };

    const handleCancel = () => {
      this.cardModal.close();
      cleanup();
    };

    insertBtn.addEventListener('click', handleInsert);
    cancelBtn.addEventListener('click', handleCancel);
  }

  handleAccordionInsert() {
    this.accordionModal.showModal();

    const cancelBtn = document.getElementById('cancelAccordion');
    const insertBtn = document.getElementById('insertAccordionBtn');

    const handleInsert = () => {
      const title = document.getElementById('accordionTitle').value;
      const content = document.getElementById('accordionContent').value;

      const accordionHtml = `
        <details class="accordion">
          <summary>${title}</summary>
          <div class="accordion-content">${content}</div>
        </details>
      `;

      this.insertContent(DOMPurify.sanitize(accordionHtml));
      //this.execCommand('insertHTML', DOMPurify.sanitize(accordionHtml));
      this.accordionModal.close();
      cleanup();
    };

    const cleanup = () => {
      insertBtn.removeEventListener('click', handleInsert);
      cancelBtn.removeEventListener('click', handleCancel);
    };

    const handleCancel = () => {
      this.accordionModal.close();
      cleanup();
    };

    insertBtn.addEventListener('click', handleInsert);
    cancelBtn.addEventListener('click', handleCancel);
  }

  handleImageInsert() {
    this.imageModal.showModal();

    const cancelBtn = document.getElementById('cancelImage');
    const insertBtn = document.getElementById('insertImageBtn');
    const fileInput = document.getElementById('imageUpload');

    const handleInsert = () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgHtml = `<img src="${e.target.result}" alt="${file.name}" style="max-width: 100%;">`;
          this.insertContent(DOMPurify.sanitize(imgHtml));
          //this.execCommand('insertHTML', DOMPurify.sanitize(imgHtml));
          this.imageModal.close();
          cleanup();
        };
        reader.readAsDataURL(file);
      }
    };

    const cleanup = () => {
      insertBtn.removeEventListener('click', handleInsert);
      cancelBtn.removeEventListener('click', handleCancel);
    };

    const handleCancel = () => {
      this.imageModal.close();
      cleanup();
    };

    insertBtn.addEventListener('click', handleInsert);
    cancelBtn.addEventListener('click', handleCancel);
  }

  handleTableInsert() {
    this.tableModal.showModal();

    const cancelBtn = document.getElementById('cancelTable');
    const insertBtn = document.getElementById('insertTableBtn');

    const handleInsert = () => {
      const rows = parseInt(document.getElementById('tableRows').value);
      const cols = parseInt(document.getElementById('tableCols').value);
      const isStriped = document.getElementById('stripedTable').checked;

      let tableHtml = `<table class="${isStriped ? 'striped' : ''}">`;

      for (let i = 0; i < rows; i++) {
        if (i === 0) {
          tableHtml += '<thead>';
        } else if (i === 1) {
          tableHtml += '</thead><tbody>';
        }
        tableHtml += '<tr>';
        for (let j = 0; j < cols; j++) {
          if (i === 0) {
            tableHtml += '<th>Header</th>';
          } else {
            tableHtml += '<td>Cell</td>';
          }
        }
        tableHtml += '</tr>';
      }

      tableHtml += '</tbody></table>';

      this.insertContent("\n"+DOMPurify.sanitize(tableHtml)+"\n");
      //this.execCommand('insertHTML', DOMPurify.sanitize(tableHtml));
      this.tableModal.close();
      cleanup();
    };

    const cleanup = () => {
      insertBtn.removeEventListener('click', handleInsert);
      cancelBtn.removeEventListener('click', handleCancel);
    };

    const handleCancel = () => {
      this.tableModal.close();
      cleanup();
    };

    insertBtn.addEventListener('click', handleInsert);
    cancelBtn.addEventListener('click', handleCancel);
  }

  handleLinkInsert() {
    this.linkModal.showModal();

    const cancelBtn = document.getElementById('cancelLink');
    const insertBtn = document.getElementById('insertLinkBtn');
    const urlInput = document.getElementById('linkUrl');
    const textInput = document.getElementById('linkText');

    const handleInsert = () => {
      const url = urlInput.value;
      const text = textInput.value || url;
      //alert(text + url)
      if (url) {
        const linkHtml = `<a href="${url}" target="_blank">${text}</a>`;
        this.insertContent(DOMPurify.sanitize(linkHtml));
        //this.execCommand('insertHTML', DOMPurify.sanitize(linkHtml));

        // Reset form
        urlInput.value = '';
        textInput.value = '';

        this.linkModal.close();
      }
    };

    const handleCancel = () => {
      // Reset form
      urlInput.value = '';
      textInput.value = '';

      this.linkModal.close();
    };

    // Remove existing event listeners if any
    const newCancelBtn = cancelBtn.cloneNode(true);
    const newInsertBtn = insertBtn.cloneNode(true);

    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    insertBtn.parentNode.replaceChild(newInsertBtn, insertBtn);

    // Add new event listeners
    newCancelBtn.addEventListener('click', handleCancel);
    newInsertBtn.addEventListener('click', handleInsert);
  }

  /**
	 * Replaces or inserts HTML or text at the current range in the editor.
	 * @param {string} content - The HTML or text to insert.
	 * @param {boolean} asHTML - If true, inserts as HTML; otherwise, inserts as plain text.
	 */
	insertContent(content, asHTML = true) {
		//const range = this.getRangeOrSetToEnd();

		// Remove any selected content
		this.range.deleteContents();

		if (asHTML) {
			// Insert HTML
			const fragment = this.range.createContextualFragment(content);
			this.range.insertNode(fragment);
		} else {
			// Insert plain text
			const textNode = document.createTextNode(content);
			this.range.insertNode(textNode);
		}

		// Move the cursor to the end of the inserted content
		this.range.collapse(false);

		// Update the selection
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(this.range);
    this.history.push(this.editor.innerHTML);
	}

  execCommand(command, value = '') {
    //alert(command + value)
    this.editor.focus();
    document.execCommand(command, false, value);
    this.history.push(this.editor.innerHTML);
  }

  setContent(content) {
    this.editor.innerHTML = DOMPurify.sanitize(content);
    this.history.push(this.editor.innerHTML);
  }

  undo() {
    const content = this.history.undo();
    if (content !== null) {
      this.editor.innerHTML = content;
    }
  }

  redo() {
    const content = this.history.redo();
    if (content !== null) {
      this.editor.innerHTML = content;
    }
  }

  toggleSource() {
    const isShowingSource = this.editor.classList.contains('showing-source');
    const icon = this.toolbar.querySelector('[data-action="viewSource"] .bi');
    if (isShowingSource) {
      // Switch back to editing mode
      const content = this.editor.textContent;
      this.editor.classList.remove('showing-source');
      this.editor.innerHTML = content;
      icon.classList.remove('bi-code');
      icon.classList.add('bi-code-slash');
    } else {
      // Switch to source view mode
      const content = this.editor.innerHTML;
      this.editor.classList.add('showing-source');
      this.editor.textContent = prettyPrintHTML(content);
      icon.classList.remove('bi-code-slash');
      icon.classList.add('bi-code');
    }
  }

  removeEventListeners() {
    // Toolbar command buttons
    this.toolbar.querySelectorAll('[data-command]').forEach(button => {
      const handleClick = (e) => {
        const command = e.target.closest('[data-command]').dataset.command;
        const value = e.target.closest('[data-command]').dataset.value || '';
        this.execCommand(command, value);
      };
      button.removeEventListener('click', handleClick);
    });

    // Removing special button listeners
    const actionButtons = [
      { selector: '[data-action="insertCard"]', action: this.handleCardInsert },
      { selector: '[data-action="insertAccordion"]', action: this.handleAccordionInsert },
      { selector: '[data-action="insertImage"]', action: this.handleImageInsert },
      { selector: '[data-action="insertTable"]', action: this.handleTableInsert },
      { selector: '[data-action="insertLink"]', action: this.handleLinkInsert },
      { selector: '[data-action="undo"]', action: this.undo },
      { selector: '[data-action="redo"]', action: this.redo },
      { selector: '[data-action="viewSource"]', action: this.toggleSource },
    ];

    actionButtons.forEach(({ selector, action }) => {
      const button = this.toolbar.querySelector(selector);
      if (button) {
        const handleClick = () => {
          if (typeof action === 'function') {
            action.call(this);
          }
        };
        button.removeEventListener('click', handleClick);
      }
    });

    // Emoji picker buttons
    this.toolbar.querySelectorAll('.emoji-btn').forEach(btn => {
      const handleEmojiClick = (e) => {
        e.preventDefault();
        this.execCommand('insertText', e.target.dataset.emoji);
      };
      btn.removeEventListener('click', handleEmojiClick);
    });

    // Content change tracking
    const handleInput = () => {
      this.history.push(this.editor.innerHTML);
    };
    this.editor.removeEventListener('input', handleInput);

		document.getElementById(this.container.id).innerHTML = this.history.index[0] ?? this.editor.innerHTML;
		//this.modalContainer.remove()
		document.body.removeChild(this.modalContainer);
  }

  getContent(format = 'html') {
    const html = DOMPurify.sanitize(this.editor.innerHTML);
    return format === 'markdown' ? this.turndownService.turndown(html) : html;
  }
}