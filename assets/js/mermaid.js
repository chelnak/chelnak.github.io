// Kramdown puts the language on <code> or its enclosing <pre>.
const blocks = document.querySelectorAll(
  'pre code.language-mermaid, pre.language-mermaid code'
);

if (blocks.length) {
  try {
    const { default: mermaid } = await import(
      'https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.esm.min.mjs'
    );
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });
    await document.fonts.ready;

    for (const [index, code] of [...blocks].entries()) {
      try {
        const { svg } = await mermaid.render(`mermaid-diagram-${index}`, code.textContent);
        const diagram = document.createElement('div');
        diagram.className = 'mermaid-diagram';
        diagram.innerHTML = svg;
        code.closest('pre').replaceWith(diagram);
      } catch (error) {
        // Keep the original source readable if a diagram cannot be rendered.
        console.error('Could not render Mermaid diagram:', error);
      }
    }
  } catch (error) {
    console.error('Could not load Mermaid:', error);
  }
}
