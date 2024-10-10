import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  themeColor: "",
  themeSecondaryColor: "",
  backgroundColor: "",
  button: "",
  banners: [],
  logo: "",
  topBarText: "",
  topBarBgColor: "",
  topBarForeColor: "",
  categoryBarBgColor: "",
  categoryBarForeColor: "",
  categoryHoverColor: "",
  categoryActiveColor: "",
  categoryFontSize: "",
  categoryFontStyle: "",
  productBgColor: "",
  productNameForeColor: "",
  productDescForeColor: "",
  productHoverColor: "",
  productPriceBgColor: "",
  productPriceForeColor: "",
  productAddBtnBgColor: "",
  productNameFontSize: "",
  productDescFontSize: "",
  productPopupHeaderFontSize: "",
  productPopupDescFontSize: "",
  footerBgColor: "",
  footerForeColor: "",
  viewCartBgColor: "",
  viewCartForeColor: "",
  productPopupBgColor: "",
  productPopupHeaderBgColor: "",
  productPopupHeaderForeColor: "",
  productPopupDescForeColor: "",
  productPopupPriceForeColor: "",
  productPopupAddToCartForeColor: "",
  productPopupAddToCartBgColor: "",
  productPopupPlusMinusBgColor: "",
  productPopupQtyForeColor: "",
  dealPopupOptionNameForeColor: "",
  dealPopupProductNameForeColor: "",
  deapPopupProductNameFontSize: "",
};

// Create theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      // Destructure payload for cleaner code
      const {
        themeColor,
        themeSecondaryColor,
        backgroundColor,
        button,
        banners,
        logo,
        topBarText,
        topBarBgColor,
        topBarForeColor,
        categoryBarBgColor,
        categoryBarForeColor,
        categoryActiveColor,
        categoryHoverColor,
        categoryFontSize,
        categoryFontStyle,
        productBgColor,
        productNameForeColor,
        productDescForeColor,
        productHoverColor,
        productPriceBgColor,
        productPriceForeColor,
        productAddBtnBgColor,
        productNameFontSize,
        productDescFontSize,
        productPopupHeaderFontSize,
        productPopupDescFontSize,
        footerBgColor,
        footerForeColor,
        viewCartBgColor,
        viewCartForeColor,
        productPopupBgColor,
        productPopupHeaderBgColor,
        productPopupHeaderForeColor,
        productPopupDescForeColor,
        productPopupPriceForeColor,
        productPopupAddToCartForeColor,
        productPopupAddToCartBgColor,
        productPopupPlusMinusBgColor,
        productPopupQtyForeColor,
        dealPopupOptionNameForeColor,
        dealPopupProductNameForeColor,
        deapPopupProductNameFontSize,
      } = action.payload;

      // Update the state based on the action payload
      state.themeColor = themeColor;
      state.themeSecondaryColor = themeSecondaryColor;
      state.backgroundColor = backgroundColor;
      state.button = button;
      state.banners = banners;
      state.logo = logo;
      state.topBarText = topBarText;
      state.topBarBgColor = topBarBgColor;
      state.topBarForeColor = topBarForeColor;
      state.categoryBarBgColor = categoryBarBgColor;
      state.categoryBarForeColor = categoryBarForeColor;
      state.categoryActiveColor = categoryActiveColor;
      state.categoryHoverColor = categoryHoverColor;
      state.categoryFontSize = categoryFontSize;
      state.categoryFontStyle = categoryFontStyle;
      state.productBgColor = productBgColor;
      state.productNameForeColor = productNameForeColor;
      state.productDescForeColor = productDescForeColor;
      state.productHoverColor = productHoverColor;
      state.productPriceBgColor = productPriceBgColor;
      state.productPriceForeColor = productPriceForeColor;
      state.productAddBtnBgColor = productAddBtnBgColor;
      state.productNameFontSize = productNameFontSize;
      state.productDescFontSize = productDescFontSize;
      state.productPopupHeaderFontSize = productPopupHeaderFontSize;
      state.productPopupDescFontSize = productPopupDescFontSize;
      state.footerBgColor = footerBgColor;
      state.footerForeColor = footerForeColor;
      state.viewCartBgColor = viewCartBgColor;
      state.viewCartForeColor = viewCartForeColor;
      state.productPopupBgColor = productPopupBgColor;
      state.productPopupHeaderBgColor = productPopupHeaderBgColor;
      state.productPopupHeaderForeColor = productPopupHeaderForeColor;
      state.productPopupDescForeColor = productPopupDescForeColor;
      state.productPopupPriceForeColor = productPopupPriceForeColor;
      state.productPopupAddToCartForeColor = productPopupAddToCartForeColor;
      state.productPopupAddToCartBgColor = productPopupAddToCartBgColor;
      state.productPopupPlusMinusBgColor = productPopupPlusMinusBgColor;
      state.productPopupQtyForeColor = productPopupQtyForeColor;
      state.dealPopupOptionNameForeColor = dealPopupOptionNameForeColor;
      state.dealPopupProductNameForeColor = dealPopupProductNameForeColor;
      state.deapPopupProductNameFontSize = deapPopupProductNameFontSize;
    },
  },
});

// Export the action
export const { setTheme } = themeSlice.actions;

// Export the reducer to be used in the store
export default themeSlice.reducer;
