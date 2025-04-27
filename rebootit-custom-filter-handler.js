(function ($) {
  "use strict";

  $(function () {
    function deselectSiblingsAndChildren(checkbox) {
      var li = $(checkbox).closest("li");

      // Uncheck all siblings
      li.siblings("li")
        .find("input.shopengine-filter-categories")
        .prop("checked", false);

      // Uncheck all children
      li.find("ul input.shopengine-filter-categories").prop("checked", false);

      // Ensure parents are checked if child is checked
      if ($(checkbox).is(":checked")) {
        $(checkbox)
          .parents("ul.shopengine-filter-category-subcategories")
          .each(function () {
            $(this)
              .siblings(".filter-input-group")
              .find("input.shopengine-filter-categories")
              .prop("checked", true);
          });
      }
    }

    function doAjaxFilter(selectedCategories) {
      var baseUrl = window.location.href
        .split(/[?#]/)[0]
        .replace(/\/page\/\d+\//g, "");
      var params = {};

      // only send categories if any selected
      if (selectedCategories.length) {
        params["shopengine_filter_category"] = selectedCategories.join(",");
      }

      // update URL
      var q = $.param(params);
      var newUrl = baseUrl + (q ? "?" + q : "");
      window.history.replaceState({}, document.title, newUrl);

      // AJAX load products
      var $container = $(".shopengine-archive-products").first();
      if (window.shopengine_filter_ajax) window.shopengine_filter_ajax.abort();

      window.shopengine_filter_ajax = $.ajax({
        method: "GET",
        url: baseUrl,
        data: params,
        beforeSend: function () {
          $container.addClass("is-loading");
        },
        success: function (response) {
          var $new = $(response).find(".shopengine-archive-products");
          $container.html($new.html());

          // update result count
          var rc = $new.find("p.woocommerce-result-count").text();
          $(".shopengine-archive-result-count > p").text(rc);
        },
        complete: function () {
          $container.removeClass("is-loading");
        },
      });
    }

    // checkbox-change handler
    $(document).on("change", "input.shopengine-filter-categories", function () {
      deselectSiblingsAndChildren(this);

      // only leaf nodes
      var selected = $("input.shopengine-filter-categories:checked")
        .filter(function () {
          return (
            $(this)
              .closest("li")
              .find("ul input.shopengine-filter-categories:checked").length ===
            0
          );
        })
        .map(function () {
          return this.value;
        })
        .get();

      doAjaxFilter(selected);
    });

    // reset button handler
    $(document).on("click", ".shopengine-filter-price-reset", function (e) {
      e.preventDefault();
      // clear all checkboxes
      $("input.shopengine-filter-categories").prop("checked", false);

      // clear categories from URL and reload empty filter
      doAjaxFilter([]);
    });
  });
})(jQuery);
