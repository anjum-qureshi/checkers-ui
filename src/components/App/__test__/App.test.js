import App from '../App';
import renderer from 'react-test-renderer';

describe("App", () => {
  it("Should render the snapshot for App", () => {
    const tree = renderer
      .create(<App/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
