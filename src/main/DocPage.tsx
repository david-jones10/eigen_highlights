import rangy from 'rangy';
import { useEffect, useState } from 'react';
import './DocPage.scss';
import { pageContent } from './PageContent';
import SnippetDrawer from './SnippetDrawer';

interface IProps {}

export interface ISnippet {
  id: number;
  content: string;
}

export const replaceHtml = (selString: string) => {
  const str1 = selString.replace(/highlight-([0-9])/g, (s) => {
    let arr = s.split('-');
    arr[1] = (parseInt(arr[1]) + 1).toString();
    return arr.join('-');
  });

  let htmlTags = 0;
  let openTags = 0;
  let openSpans = 0;
  const str2 = str1.replace(/<[^<>]+>/g, (match) => {
    htmlTags++;
    if (openTags === 0) {
      if (match.substring(1, 2) !== '/') {
        openTags++;
        //get preceeding tag and close
        let closeTag = `</${match.substring(1).split(' ')[0]}>`;
        return closeTag + match;
      } else {
        alert("Something went wrong - shouldn't close tag without preceeding open");
        return '';
      }
    } else {
      if (match.substring(1, 2) === '/') {
        openTags--;
        openSpans++;
        if (openTags === 0) {
          return match + "<span class='highlight-1'>";
        } else {
          return match;
        }
      } else {
        openTags++;
        openSpans--;
        return '</span>' + match;
      }
    }
  });

  if (htmlTags === 0) return `<span class='highlight-1'>${str2}</span>`;
  return (str2.substring(0, 1) === '<' ? '' : "<span class='highlight-1'>") + str2 + (openSpans > 0 ? '</span>' : '');
};

const DocPage = (props: IProps) => {
  const [markup, setMarkup] = useState<string>(pageContent);
  const [snippets, setSnippets] = useState<Array<string>>([]);

  useEffect(() => {
    const container = document.getElementById('doc-container');
    container?.addEventListener('mouseup', () => getSnippet());
    return container?.removeEventListener('mouseup', () => getSnippet());
  }, []);

  const getSnippet = () => {
    const text = window.getSelection()?.toString() || '';
    if (text.length) {
      var sel = rangy.getSelection();
      var selHtml = sel.toHtml().trim();

      // possible togglable option, or as part of further select on highlight/key press function
      const displaySelection = false;
      if (displaySelection) alert(selHtml);

      setSnippets((s) => s.concat(text));
      // setHtml doesn't always match because it adds the preceeding opening tag!

      let searchString = selHtml;
      if (selHtml.substring(0, 1) === '<') {
        //dirty way of removing first tag which is auto-added by rangy
        searchString = selHtml.substring(selHtml.indexOf('>') + 1);
      }

      setMarkup((m) => m.replace(searchString, replaceHtml(selHtml)));
    }
  };

  const deselectSnippet = (id: number) => {
    const text = snippets[id];
    setSnippets((ss) => ss.filter((s, idx) => idx !== id));
    setMarkup((m) => m.replace(`<span class='highlight'>${text}</span>`, text));
  };

  return (
    <div className="doc-page">
      <div id="doc-container" className="doc-container" dangerouslySetInnerHTML={{ __html: markup }} />

      <SnippetDrawer snippets={snippets} onDeselect={(id) => deselectSnippet(id)} />
    </div>
  );
};

export default DocPage;
