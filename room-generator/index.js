const { Parser } = require('./parser');

const htmlStr = `<div class="markdown-preview-sizer markdown-preview-section" style="padding-bottom: 380px;"><div class="markdown-preview-pusher" style="width: 1px; height: 0.1px; margin-bottom: 0px;"></div><div><div class="page-header">Publish Home Page</div></div><div><p>Random linked<sup data-footnote-id="fnref-1-452f07a459dfadc4" class="footnote-ref" id="fnref-1-452f07a459dfadc4"><a href="#fn-1-452f07a459dfadc4" class="footnote-link" target="_blank" rel="noopener">[1]</a></sup> and generally unedited collection of:</p></div><div><ul>
<li data-line="0">Books (Readwise/books)</li>
<li data-line="1"><a data-href="Music" href="https://publish.obsidian.md/bramses/Music" class="internal-link" target="_blank" rel="noopener">Music</a></li>
<li data-line="2"><a data-href="Anime" href="https://publish.obsidian.md/bramses/Anime" class="internal-link" target="_blank" rel="noopener">Anime</a></li>
<li data-line="3"><a data-href="Creative Coding" href="https://publish.obsidian.md/bramses/Creative+Coding" class="internal-link" target="_blank" rel="noopener">Creative Coding</a></li>
<li data-line="4"><a data-href="Investing" href="https://publish.obsidian.md/bramses/Investing" class="internal-link" target="_blank" rel="noopener">Investing</a></li>
<li data-line="5"><a data-href="Apps That Are My Soul" href="https://publish.obsidian.md/bramses/Apps+That+Are+My+Soul" class="internal-link" target="_blank" rel="noopener">Apps That Are My Soul</a></li>
<li data-line="6"><a aria-label-position="top" aria-label="https://www.bramadams.dev/" rel="noopener" class="external-link" href="https://www.bramadams.dev/" target="_blank">Porfolio Home Page</a></li>
<li data-line="7"><a aria-label-position="top" aria-label="https://bramses.notion.site/a49c1e962b7646879176ac3b327b6533?v=4d1eda54b170483cb03a40f257231764" rel="noopener" class="external-link" href="https://bramses.notion.site/a49c1e962b7646879176ac3b327b6533?v=4d1eda54b170483cb03a40f257231764" target="_blank">Memes</a></li>
</ul></div><div><p>Check the sidebar to get started (or if you're on mobile the three hamburger lines in the top left)</p></div><div></div><div>
</div><div><section class="footnotes"><hr><ol>
<li data-line="0" data-footnote-id="fn-1-452f07a459dfadc4" id="fn-1-452f07a459dfadc4">how thought should be stored! Much like a <a aria-label-position="top" aria-label="https://news.mit.edu/2017/explained-neural-networks-deep-learning-0414" rel="noopener" class="external-link" href="https://news.mit.edu/2017/explained-neural-networks-deep-learning-0414" target="_blank">neural net</a>! <a href="#fnref-1-452f07a459dfadc4" class="footnote-backref footnote-link" target="_blank" rel="noopener">↩︎</a></li>
</ol></section></div><div></div></div>`

const parser = new Parser(htmlStr);
console.log(parser.fetchInternalLinks());
