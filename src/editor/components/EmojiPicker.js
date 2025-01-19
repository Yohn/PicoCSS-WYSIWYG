export function createEmojiPicker() {
  const picker = document.createElement('div');
  picker.className = 'emoji-picker dropdown-menu';

  const commonEmojis = ['😀', '😂', '🥰', '😎', '🤔', '👍', '👎', '❤️', '⭐', '🔥'];

  picker.innerHTML = commonEmojis
    .map(emoji => `<button class="emoji-btn" data-emoji="${emoji}">${emoji}</button>`)
    .join('');

  return picker;
}