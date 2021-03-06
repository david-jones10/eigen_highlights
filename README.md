<h1>Highlights</h1>
<p>A simple application built in React/TypeScript to demonstrate highlighting of text which:
  <ul>
    <li>Displays structured text as HTML, from a sample text block</li>
    <li>Allows users to make multiple overlapping selections of that text</li>
    <li>Shows all sections separately on the page</li>
  </ul>
</p>

<br />

<h1>Installation</h1>

Clone the repo, and then from <b>eigen_highlights</b> directory:

<li><code>npm install</code></li>
<li><code>npm start</code></li>

<br />

<p>
  Browse to 
  <a href='localhost:3000'>localhost:3000</a>
</p>

<br />

<h1>Known issues/limitations</h1>

<h2>Cross paragraph highlighting</h2>
<p> <code>window.getSelection()</code> gives the text highlighted, but not any interceding html tags. The simple <code>text.replace()</code> does not deal with these - meaning cross paragraph highlights do not remain on page (although they do appear in the snippets panel). </p>
<p><b>Potential solution:</b> RegEx to identify html tags, if found then close the span in first paragraph, reopen in next paragraph (as well as the pre/suffix spans) to highlight. This may need further consideration for highlighting across 2 or more paragraph/other html tags. I did play with <a href='https://www.npmjs.com/package/xpath-range'>xpath-range</a> which looked promising - giving the xpath of the start and end of selection, but I didn't find a clean way of parsing the selection in the range and converting in the html content string.</p>

<br />

<h2>Highlighting over the start of another highlight region doesn't work properly</h2>
<p>The browser <code>::selection</code> formatting is shown, and the text is added to the list of snippets. However, the replace does not handle the content containing an intervening html tag properly, so the text is not correctly formatted.</p>
<p><b>Potential solution:</b> More time spent working on this? Needs much more than regex to resolve, need to parse entire HTML to keep count of the open/closed tags at least.</p>

<br />

<h2>Single word highlighting</h2>
<p>Simple <code>text.replace()</code> replaces the first instance of a match. If selecting single words or repeated short phrases, if this is not the first instance of this word/phrase the the wrong snippet is highlighted</p>
<p><b>Potential solution:</b> Prevent selection if single word with no spaces and more than 1 instance of snippet.</p>

<br />

<h2>Remove button doesn't work cleanly for overlapping snippets</h2>
<p>Need to be cleverer in storing snippets. In developing this, looked at xpaths as a possible solution for finding the current location- even this would need to be dynamically updated for each new highlight as they introduce new spans.</p>

<br />

<h2>This doesn't handle jsx/tsx self closed tags</h2>
<p>Have always assumed that tags are original html tags, ie <code>&lt;tag>content&lt;/tag></code>, this does not account for self-closed tags eg <code> &lt;tag children={content} /> </code>seen in jsx/tsx.</p>

<br />

<h2><code>dangerouslySetInnerHtml</code> requires proper sanitisation</h2>
<p>Relatively safe in this context as the content in selections is based on a known object, but it is possible to insert malicious code using dangerouslySetInnerHtml.</p>
<p><b>Potential solution:</b> Proper sanitisation of HTML with tools such as <a href='https://www.npmjs.com/package/dompurify'>DOMPurify</a> or even an altogether different solution.</p>

<br />

<h2>Should have proper tests for highlight functionality</h2>
<p>Wasn't sure of a quick solution for highlighting snippets of text programatically. Ideally would simulate this, and then check for snippets being added to the snippet drawer.</p>

<br />

<h2>Selection mode</h2>
<p>Would be nice to add a selection mode option, eg auto-select on highlight, or offer popup to toggle highlight of current selection. This allows imprecise highlighters a chance to re-try and get accurate selection before adding to the list.</p>

<br />

<h2>Improve styling</h2>
<p>I've only put in very basic styling to position components, and for selection functionality. I have used <a href='https://react.semantic-ui.com'>Semantic React UI</a> in previous work for a styling framwork, but have intentionally kept this project lightweight.</p>