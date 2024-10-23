

const getDiscounts = (productDetailId, price, table13) => {

    // Find the discount percent based on the product detail ID
    const discountPercent = table13.find((item) => item.ProductDetailId === productDetailId)?.DiscountPercent;


    // calculate after discount price
    const afterDiscountPrice = price - (price * discountPercent / 100);

    return { discountPercent: discountPercent || 0, afterDiscountPrice };
    

};

export default getDiscounts;
