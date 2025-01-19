//import { editorColors } from '../config/colors.js';
import { createEmojiPicker } from './EmojiPicker.js';


//<!--details class="dropdown">
//  <summary role="button" aria-haspopup="listbox">Size</summary>
//  <ul role="listbox">
//    <li><button data-command="fontSize" data-value="1">Small</button></li>
//    <li><button data-command="fontSize" data-value="3">Normal</button></li>
//    <li><button data-command="fontSize" data-value="5">Large</button></li>
//    <li><button data-command="fontSize" data-value="7">Huge</button></li>
//  </ul>
//</details>
////! Make sure to add the color const file to the combined.js file before adding this again.
//<details class="dropdown">
//  <summary role="button" aria-haspopup="listbox">Color</summary>
//  <ul role="listbox" class="color-menu" dir="rtl">
//    ${editorColors.map(color => `
//      <li><button data-command="foreColor" data-value="${color.value}" style="color: ${color.value}">
//        <i class="bi bi-circle-fill"></i> ${color.name}
//      </button></li>
//    `).join('')}
//  </ul>
//</details>-->

export function createToolbar() {
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