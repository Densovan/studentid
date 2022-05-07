const products = require('../data/products.json');

exports.geProducts = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: products,
    });
  } catch (e) {
    throw new Error(`Error ${e}`);
  }
};

exports.filterProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const filterData = products.products.filter(
      (item) => item.categoryId == productId,
    );
    return res.json({
      products: filterData,
    });
  } catch (e) {
    throw new Error(`Error ${e}`);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = products.products.filter((item) => item.id == id);
    return res.json({
      product: product,
    });
  } catch (e) {
    throw new Error(`Error ${e}`);
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const product = products.products.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
    return res.json({
      status: 200,
      products: product
    })
  } catch (e) {
    throw new Error(`Error ${e}`);
  }
};

exports.filterProduct = async (req, res) => {
  try {
    const { id, page } = req.body;
    const product = products.products.filter((item) => item.id == id && item.page == page);
    return res.json({
      status: 200,
      products: product,
    })
  } catch (e) {
    throw new Error(`Error ${e}`);
  }
}