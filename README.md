<h1>To run application</h1>

From <b>eigen_highlights</b> directory:

<li>npm install</li>
<li>npm start</li>

<br />

<p>
  Browse to 
  <a href='localhost:3000'>localhost:3000</a>
</p>

<hr />
<br />
<h1>Known issues/limitations</h1>

<h2>Cross paragraph highlighting</h2>
<p> <code>window.getSelection()</code> gives the text highlighted, but not any interceding html tags. The simple <code>text.replace()</code> does not deal with these - meaning cross paragraph highlights do not appear on page. </p>
<p><b>Potential solution:</b> RegEx to identify html tags, if found then close the span in first paragraph, reopen in next paragraph (as well as the pre/suffix spans) to highlight. This may need further consideration for highlighting across 2 or more paragraph/other html tags</p>

<br />

<h2>Overlapping selection breaks highlighting of second highlight</h2>
<p>The browser <code>::selection</code> formatting is shown, but the simple replace does not handle the content containing an intervening html tag</p>
<p><b>Potential solution:</b> As previous - Regex to identify and close/reopen html tags as appropriate</p>

<br />

<h2>Single word highlighting</h2>
<p>Simple <code>text.replace()</code> replaces the first instance of a match. If selecting single words or repeated short phrases, if this is not the first instance of this word/phrase the the wrong snippet is highlighted</p>
<p><b>Potential solution:</b> Prevent selection if single word with no spaces and more than 1 instance of snippet.</p>

<br />

<h2><code>dangerouslySetInnerHtml</code> requires proper sanitisation</h2>
<p>Relatively safe as the content in selections is unlikely to contain dangerous code in and of itself, but it is possible to insert dangerous code with this.  </p>
<p><b>Potential solution:</b> Proper sanitisation with or even an altogether different solution. Ref: <a href='https://stackoverflow.com/questions/64261021/sanitizers-vs-dangerouslysetinnerhtml'>https://stackoverflow.com/questions/64261021/sanitizers-vs-dangerouslysetinnerhtml</a></p>

<br />

<h2>Improve styling</h2>
<p>I've only put in very basic styling to position components, and for selection functionality. I have used <a href='https://react.semantic-ui.com'>Semantic React UI</a> in previous work for a styling framwork, but have intentionally kept this project lightweight.</p>

<br />

<h2>Testing</h2>
<p>Only on-page testing done to validate behaviour. Would be tested with component render/functional tests in a production application.</p>