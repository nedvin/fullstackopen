import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from '../src/components/NewBlogForm';

describe('<NewBlogForm />', () => {
  test('calls the passed in event handler when submitted', async () => {
    const handlerMock = jest.fn();

    render(<NewBlogForm onSubmit={handlerMock} />);

    const titleInput = screen.getByLabelText('title:');
    const authorInput = screen.getByLabelText('author:');
    const urlInput = screen.getByLabelText('url:');

    const user = userEvent.setup();
    await user.type(titleInput, 'the old man and the sea');
    await user.type(authorInput, 'ernest hemingway');
    await user.type(urlInput, 'www.ernesthemingway.com');
    await user.click(screen.getByText('create'));

    const submittedObject = handlerMock.mock.calls[0][0];
    expect(handlerMock.mock.calls).toHaveLength(1);
    expect(submittedObject.title).toBe('the old man and the sea');
    expect(submittedObject.author).toBe('ernest hemingway');
    expect(submittedObject.url).toBe('www.ernesthemingway.com');
  });
});
