// Kramdown puts the language on <code> or its enclosing <pre>.
const blocks = document.querySelectorAll(
  'pre code.language-mermaid, pre.language-mermaid code'
);

if (blocks.length) {
  try {
    const { default: mermaid } = await import(
      'https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.esm.min.mjs'
    );
    await document.fonts.ready;
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const diagrams = [...blocks].map(code => ({
      source: code.textContent,
      element: code.closest('pre')
    }));
    async function renderDiagrams() {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: preference.matches ? 'dark' : 'default'
      });
      for (const [index, entry] of diagrams.entries()) {
        try {
          const { svg } = await mermaid.render(`mermaid-diagram-${index}`, entry.source);
          const diagram = document.createElement('div');
          diagram.className = 'mermaid-diagram';
          diagram.innerHTML = svg;
          entry.element.replaceWith(diagram);
          entry.element = diagram;
        } catch (error) {
          // Keep the source or previous diagram readable if rendering fails.
          console.error('Could not render Mermaid diagram:', error);
        }
      }
    }
    // Serialize renders when the system theme changes during rendering.
    let pending = renderDiagrams();
    preference.addEventListener('change', () => {
      pending = pending.then(renderDiagrams);
    });
    await pending;
  } catch (error) {
    console.error('Could not load Mermaid:', error);
  }
}
