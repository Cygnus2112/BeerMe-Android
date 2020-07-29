/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

import Wishlist from '../views/wishlist';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Testing Wishlist', () => {
  const wishlist = [
    {
      "abv": "5.8",
      "brewery": "SweetWater Brewing Company", "descript": "An American Brown Ale, deep copper-colored, mild malt.",
      "icon": "https://brewerydb-images.s3.amazonaws.com/beer/9cqNKc/upload_fyCyII-icon.png",
      "id": "9cqNKc",
      "label": "https://brewerydb-images.s3.amazonaws.com/beer/9cqNKc/upload_fyCyII-medium.png",
      "name": "Georgia Brown", 
      "style": "American-Style Brown Ale", "website": "http://www.sweetwaterbrew.com/"
    },
    {
      "abv": "8.5",
      "brewery": "Laughing Dog Brewing",
      "descript": "A True Hop Bomb Brewed plenty of Columbus and Mt Hood Hops for a Piney hop character.",
      "icon": "https://brewerydb-images.s3.amazonaws.com/beer/aG4Ie2/upload_yX4wkY-icon.png",
      "id": "aG4Ie2",
      "label": "https://brewerydb-images.s3.amazonaws.com/beer/aG4Ie2/upload_yX4wkY-medium.png",
      "name": "Alpha Dog Imperial IPA",
      "style": "Imperial or Double India Pale Ale",
      "website": "http://www.laughingdogbrewing.com/"
    }, {
      "abv": "8.2",
      "brewery": "Lagunitas Brewing Company",
      "descript": "Caution must be exercised when drinking this beer.",
      "icon": "https://brewerydb-images.s3.amazonaws.com/beer/fnqCGB/upload_IaFcNP-icon.png",
      "id": "fnqCGB",
      "label": "https://brewerydb-images.s3.amazonaws.com/beer/fnqCGB/upload_IaFcNP-medium.png",
      "name": "Maximus",
      "style": "American-Style India Pale Ale", "website": "http://www.lagunitas.com/"
    }
  ];

  it('renders as expected', () => {
    const initialState = {
      wishlistReducer: {
        wishlist,
      }
    };

    const wrapper = shallow(
      <Wishlist />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});

