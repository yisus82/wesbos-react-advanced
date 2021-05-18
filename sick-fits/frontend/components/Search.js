import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import {
  DropDownItemStyles,
  DropDownStyles,
  SearchStyles,
} from './styles/DropDownStyles';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchResults: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const router = useRouter();

  const [findItems, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });

  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter();

  const items = data?.searchResults || [];

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange: () =>
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      }),
    onSelectedItemChange: ({ selectedItem }) =>
      router.push({
        pathname: `/product/${selectedItem.id}`,
      }),
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDownStyles {...getMenuProps()}>
        {inputValue !== '' &&
          isOpen &&
          items.map((item, index) => (
            <DropDownItemStyles
              key={item.id}
              {...getItemProps({ item, index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.description}
                width="50"
              />
              {item.name}
            </DropDownItemStyles>
          ))}
        {isOpen && !loading && items.length === 0 && (
          <DropDownItemStyles>
            No items found for '{inputValue}'
          </DropDownItemStyles>
        )}
      </DropDownStyles>
    </SearchStyles>
  );
};

export default Search;
