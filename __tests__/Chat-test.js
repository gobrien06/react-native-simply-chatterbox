import * as React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(
    <App 
    messages={[
        {
            content: 'Test of the message.',
            date: 'currentDate',
            userID:'some random ID',
      }
    ]}

    user = {
      {
        userID:'someRandomID',
        userName:'someUserName',
    }
    }
    />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });