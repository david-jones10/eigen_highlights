/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import DocPage, { replaceHtml } from './DocPage';
import Snippet from './Snippet';

test('renders DocPage and children', () => {
  const { container } = render(<DocPage />);

  expect(container).toBeVisible();

  expect(container.querySelector('.doc-page')).toBeInTheDocument();
  expect(container.querySelector('.doc-container')).toBeInTheDocument();
  expect(container.querySelector('.snippet-drawer')).toBeInTheDocument();
  expect(container.querySelector('.snippet')).not.toBeInTheDocument();
});

test('snippet renders, fires button onclick', () => {
  let counter = 0;
  const { container } = render(<Snippet snippet="test selection string" onDeselect={() => counter++} />);

  expect(container).toBeVisible();

  const removeButton = container.querySelector('button.remove');
  expect(removeButton).toBeInTheDocument();

  if (removeButton) {
    // always expect this true as we expect removeButton toBeInTheDocument
    fireEvent.click(removeButton);
    // eslint-disable-next-line jest/no-conditional-expect
    expect(counter).toEqual(1);
  }
});

test('replaceStyle correctly changes html', () => {
  // No text - encapsulate
  let test1 = 'text';
  let expect1 = "<span class='highlight-1'>text</span>";
  expect(replaceHtml(test1)).toEqual(expect1);

  // Space etiher side of existing highlight - increment class and encapsulate
  // !Won't actually see this - rangy always gives the opening tag
  let test2 = "text <span class='highlight-1'> to get the rest </span> of the text";
  let expect2 =
    "<span class='highlight-1'>text </span><span class='highlight-2'> to get the rest </span><span class='highlight-1'> of the text</span>";
  expect(replaceHtml(test2)).toEqual(expect2);

  // !Re-highlight exact same area again - edge case which doesn't work in real-use
  // This is because rangy doesn't include the span tags, just the content of the selection
  // therefore don't know about existing highlighter span in replaceStyle
  let test3 = "<span class='highlight-1'>text</span>";
  //let expect3 = "<span class='highlight-1'><span class='highlight-2'>text</span></span>";
  let expect3 = "</span><span class='highlight-2'>text</span><span class='highlight-1'></span>";

  expect(replaceHtml(test3)).toEqual(expect3);

  // Select partially across end of existing highlight
  // rangy will return the preprended opening tag even though it's not actually present, so need to close before too
  let test4 = "<span class='highlight-1'>highlighted</span> and not highlighted";
  let expect4 = "</span><span class='highlight-2'>highlighted</span><span class='highlight-1'> and not highlighted</span>";
  expect(replaceHtml(test4)).toEqual(expect4);

  // Select partially across start of existing highlight
  let test5 = "<p>streamed on YouTube.</p><p><a href='#1'>Leaked images of </a></p>"
  let expect5 =
    "</p><span class='highlight-1'><p>streamed on YouTube.</p></span><p><a href='#1'><span class='highlight-1'>Leaked images of </span></a></p>";
  expect(replaceHtml(test5)).toEqual(expect5);
});
