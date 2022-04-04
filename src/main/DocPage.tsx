import { useEffect, useState } from 'react';
import './DocPage.scss';
import { pageContent } from './PageContent';
import SnippetDrawer from './SnippetDrawer';

interface IProps {}

export interface ISnippet {
  id: number;
  content: string;
}

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
      setSnippets((s) => s.concat(text));
      setMarkup((m) => m.replace(text, `<span class='highlight'>${text}</span>`));
    }
  };

  const deselectSnippet = (id: number) => {
    const text = snippets[id];
    setSnippets((ss) => ss.filter((s, idx) => idx !== id));
    setMarkup((m) => m.replace(`<span class='highlight'>${text}</span>`, text));
  };

  return (
    <div className='doc-page'>
      <div id='doc-container' className='doc-container' dangerouslySetInnerHTML={{ __html: markup }} />

      <SnippetDrawer snippets={snippets} onDeselect={(id) => deselectSnippet(id)} />
    </div>
  );
};

export default DocPage;
