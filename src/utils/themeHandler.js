// Helper function to get value by SetupDetailName
const getValue = (settingsArray, key) =>
  settingsArray?.filter((x) => x.SetupDetailName === key)[0]?.SettingValue;

export const getThemeAndSetIntoRedux = ({ Table1 }) => {
  return {
    themeColor: getValue(Table1, "themeColor"),
    themeSecondaryColor: getValue(Table1, "themeSecondaryColor"),
    backgroundColor: getValue(Table1, "secondaryColor"),
    button: getValue(Table1, "Button"),
    banners: Table1?.filter((x) => x.SetupDetailName === "Upload Banner").map(
      (x) => x.SettingValue
    ), // For banner array,
    logo: getValue(Table1, "Upload Logo"),
    topBarText: getValue(Table1, "Top Bar Text"),
    topBarBgColor: getValue(Table1, "Top Bar Bg Color"),
    topBarForeColor: getValue(Table1, "Top Bar Fore Color"),
    categoryBarBgColor: getValue(Table1, "Category Bar Bg Color"),
    categoryBarForeColor: getValue(Table1, "Category Bar Fore Color"),
    categoryHoverColor: getValue(Table1, "Category Hover Color"),
    categoryActiveColor: getValue(Table1, "Category Active Color"),
    categoryFontSize: getValue(Table1, "Category Font Size"),
    categoryFontStyle: getValue(Table1, "Category Font Style"),
    productBgColor: getValue(Table1, "Product Bg Color"),
    productNameForeColor: getValue(Table1, "Product Name Fore Color"),
    productDescForeColor: getValue(Table1, "Product Desc Fore Color"),
    productHoverColor: getValue(Table1, "Product Hover Color"),
    productPriceBgColor: getValue(Table1, "Product Price Bg Color"),
    productPriceForeColor: getValue(Table1, "Product Price Fore Color"),
    productAddBtnBgColor: getValue(Table1, "Product Add ( + ) Btn Bg Color"),
    productNameFontSize: getValue(Table1, "Product Name Font Size"),
    productDescFontSize: getValue(Table1, "Product Desc Font Size"),
    productPopupHeaderFontSize: getValue(
      Table1,
      "Product Popup Header Product Font Size"
    ),
    productPopupDescFontSize: getValue(Table1, "Product Popup Desc Font Size"),
    footerBgColor: getValue(Table1, "Footer Bg Color"),
    footerForeColor: getValue(Table1, "Footer Fore Color"),
    viewCartBgColor: getValue(Table1, "View Cart Bg Color"),
    viewCartForeColor: getValue(Table1, "View Cart Fore Color"),
    productPopupBgColor: getValue(Table1, "Product Popup Bg Color"),
    productPopupHeaderBgColor: getValue(
      Table1,
      "Product Popup Header Bg Color"
    ),
    productPopupHeaderForeColor: getValue(
      Table1,
      "Product Popup Header Fore Color"
    ),
    productPopupDescForeColor: getValue(
      Table1,
      "Product Popup Desc Fore Color"
    ),
    productPopupPriceForeColor: getValue(
      Table1,
      "Product Popup Price Fore Color"
    ),
    productPopupAddToCartForeColor: getValue(
      Table1,
      "Product Popup Add To Cart Fore Color"
    ),
    productPopupAddToCartBgColor: getValue(
      Table1,
      "Product Popup Add To Cart Bg Color"
    ),
    productPopupPlusMinusBgColor: getValue(
      Table1,
      "Product Popup Plus Minus Bg Color"
    ),
    productPopupQtyForeColor: getValue(Table1, "Product Popup Qty Fore Color"),
    dealPopupOptionNameForeColor: getValue(
      Table1,
      "Deal Popup Option Name Fore Color"
    ),
    dealPopupProductNameForeColor: getValue(
      Table1,
      "Deal Popup Product Name Fore Color"
    ),
    deapPopupProductNameFontSize: getValue(
      Table1,
      "Deal Popup Product Name Font Size"
    ),
  };
};
