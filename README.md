# ShopEngine Custom Filter

A small WordPress plugin that enhances the ShopEngine product filters:

- **Single-select per level**: Allows only a single checkbox selection per depth.  
- **Uncheck cascade**: unchecking a parent automatically clears all of its children and their siblings.  
- **Leaf-only query**: only the deepest checked category in the tree is sent to the AJAX filter.  
- **AJAX-powered**: products update instantly without a full page reload.  
- **URL sync**: `?shopengine_filter_category=…` is kept in sync with your selections.  
- **Reset button**: clears all filters and query parameters in one click.

## Requirements

- **WordPress** (latest)
- **WooCommerce** ≥ 9.8.2
- **ShopEngine** ≥ 4.7.8
- **ShopEngine Pro** ≥ 2.6.5

## Tested Versions

- WooCommerce **9.8.2**  
- ShopEngine **4.7.8** + Pro **2.6.5**

Simply drop the plugin into `/wp-content/plugins/`, activate it, and make sure your ShopEngine product‐filters widget is on the page.  

