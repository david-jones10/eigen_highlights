/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import DocPage from './DocPage';
import Snippet from './Snippet';

test('renders DocPage and children', () => {
  const { container } = render(<DocPage />);

  expect(container).toBeVisible();

  expect(container.querySelector('.doc-page')).toBeInTheDocument();
  expect(container.querySelector('.doc-container')).toBeInTheDocument();
  expect(container.querySelector('.snippet-drawer')).toBeInTheDocument();
  expect(container.querySelector('.snippet')).not.toBeInTheDocument();
});

test('snippet renders', () => {
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

