import Snippet from './Snippet';
import './Snippets.scss';

interface IProps {
  snippets: Array<string>;
  onDeselect: (snippetId: number) => void;
}

const SnippetDrawer = (props: IProps) => {
  const { snippets, onDeselect } = props;

  return (
    <div className='snippet-drawer'>
      <h2>User Selections</h2>
      {snippets.length ? (
        snippets.map((s, idx) => {
          return <Snippet key={`snippet_${idx}`} snippet={s} onDeselect={() => onDeselect(idx)} />;
        })
      ) : (
        <p>Highlight text to begin</p>
      )}
    </div>
  );
};

export default SnippetDrawer;
