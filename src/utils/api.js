const BASE = 'https://dummyjson.com/';
export const PRODUCTS = BASE + 'products';
export const PRODUCTS_SEARCH = BASE + 'products/search';

export const returnOrThrow = async resJson => {
  let result;
  const status = resJson.status;

  if (status === 404 || status === 500) {
    throw 'Something went wrong';
  }
  try {
    result = await resJson.json();
  } catch (err) {
    result = {error: 'Something went wrong'};
  }
  if (status !== 200) {
    throw result.message;
  }
  return result;
};
