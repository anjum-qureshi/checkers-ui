// import { render, screen } from '@testing-library/react';
import SearchBox from '../SearchBox';
import { create, act} from 'react-test-renderer';

describe("SearchBox", () => {
  it("Should render the snapshot for SearchBox", () => {
    let element;
    act(() => {element = create(<SearchBox />)});

    expect(element.toJSON()).toMatchSnapshot();
  });

  it("Should change the value of input box on change", () => {
    let element;
    act(() => { element = create(<SearchBox />) });

    const inputBox = element.root.findByType('input');
    const searchButton = element.root.findByProps({ className: 'search-icon' });

    expect(inputBox.props.type).toBe('text');
    expect(inputBox.props.value).toBe("");
    expect(searchButton).not.toBeNull;
  });

  it("Should search for videos with word tweety when entered with word and click on search icon", () => {
    let element;
    const mockSearch = jest.fn();

    act(() => { element = create(<SearchBox search={mockSearch}/> )});

    const inputBox = element.root.findByType('input');
    const searchButton = element.root.findByProps({className:'search-icon'});

    act(() => {
      inputBox.props.onChange({ target: { value: "tweety" } });
    });

    act(() => {
      searchButton.props.onClick();
    });

    expect(inputBox.props.value).toBe("tweety");
    expect(mockSearch).toBeCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("tweety");
  });
});
