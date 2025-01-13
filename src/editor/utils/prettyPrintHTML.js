// Helper method: Pretty print HTML
export function prettyPrintHTML(html) {
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