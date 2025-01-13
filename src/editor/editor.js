import DOMPurify from 'dompurify';
import TurndownService from 'turndown';
import { createToolbar } from './components/Toolbar.js';
import { createImageModal, createTableModal, createLinkModal } from './components/Modals.js';
import { createCardModal } from './components/CardModal.js';
import { createAccordionModal } from './components/AccordionModal.js';
import { History } from './utils/history.js';
import { prettyPrintHTML } from './utils/prettyPrintHTML.js';

export class WYSIWYGEditor {
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

    this.modalContainer = document.createElement('div');
    this.modalContainer.id = 'modalContainer';

    document.body.appendChild(this.cardModal);
    document.body.appendChild(this.accordionModal);
    document.body.appendChild(this.imageModal);
    document.body.appendChild(this.tableModal);
    document.body.appendChild(this.linkModal);

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

  getContent(format = 'html') {
    const html = DOMPurify.sanitize(this.editor.innerHTML);
    return format === 'markdown' ? this.turndownService.turndown(html) : html;
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
  }
}