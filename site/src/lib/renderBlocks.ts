type TextNode = {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = {
  type: 'link';
  url: string;
  children: TextNode[];
};

type InlineNode = TextNode | LinkNode;

type BlockNode =
  | { type: 'paragraph'; children: InlineNode[] }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: 'list'; format: 'ordered' | 'unordered'; children: { type: 'list-item'; children: InlineNode[] }[] }
  | { type: 'quote'; children: InlineNode[] }
  | { type: 'code'; language?: string; children: TextNode[] }
  | { type: 'image'; image: { url: string; alternativeText?: string; width?: number; height?: number }; children: InlineNode[] };

const YT_RE = /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

function esc(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderInline(nodes: InlineNode[]): string {
  return nodes.map((node) => {
    if (node.type === 'link') {
      const match = YT_RE.exec(node.url);
      if (match) {
        const id = match[1];
        return (
          `<div class="yt-facade" data-id="${id}">` +
          `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="Video de YouTube" loading="lazy" />` +
          `<button class="yt-play" aria-label="Reproducir video">▶</button>` +
          `</div>`
        );
      }
      const label = renderInline(node.children);
      return `<a href="${esc(node.url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }

    let text = esc(node.text);
    if (!text) return '';
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.strikethrough) text = `<s>${text}</s>`;
    if (node.code) text = `<code>${text}</code>`;
    return text;
  }).join('');
}

export function renderBlocks(blocks: BlockNode[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks.map((block) => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${renderInline(block.children)}</p>`;
      case 'heading':
        return `<h${block.level}>${renderInline(block.children)}</h${block.level}>`;
      case 'quote':
        return `<blockquote>${renderInline(block.children)}</blockquote>`;
      case 'code':
        return `<pre><code>${block.children.map((c) => esc(c.text)).join('')}</code></pre>`;
      case 'image': {
        const { url, alternativeText, width, height } = block.image;
        return (
          `<figure>` +
          `<img src="${esc(url)}" alt="${esc(alternativeText ?? '')}"` +
          (width ? ` width="${width}"` : '') +
          (height ? ` height="${height}"` : '') +
          ` loading="lazy" />` +
          `</figure>`
        );
      }
      case 'list': {
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = block.children.map((item) => `<li>${renderInline(item.children)}</li>`).join('');
        return `<${tag}>${items}</${tag}>`;
      }
      default:
        return '';
    }
  }).join('\n');
}
