import { COUNT_PRODUCTS_QUERY } from '../components/Pagination';

const paginationField = () => ({
  keyArgs: false,
  read(existing = [], { args, cache }) {
    const { skip, first } = args;
    const data = cache.readQuery({ query: COUNT_PRODUCTS_QUERY });
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);
    const items = existing.slice(skip, skip + first);
    if (items.length && items.length !== first && page === pages) {
      return items;
    }
    if (items.length !== first) {
      return false;
    }
    if (items.length) {
      return items;
    }
    return false;
  },
  merge(existing, incoming, { args }) {
    const { skip } = args;
    const merged = existing ? existing.slice(0) : [];
    for (let i = skip; i < skip + incoming.length; i++) {
      merged[i] = incoming[i - skip];
    }
    return merged;
  },
});

export default paginationField;
