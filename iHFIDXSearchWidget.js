// <script src="https://www.idxhome.com/site/listing/search/widget/CLIENT-ID?style=horizontal&showPropertyType=true"></script>

// Modify some of IDX search default look and behavior
// <script>
// dmAPI is a JavaScript API from the Duda site builder. It is similar to jQuery's .ready() method.
dmAPI.runOnReady("idx-search", () => {
  // Recursive IIFE
  // This will likely to hit a performance issue. But nevertheless, the search widget
  // is in the hero section and completely visible from the beginning. After some time,
  // the recursive function will end when the search element <form> has been loaded.
  (function recursive(selector) {
    const form =
      $(selector)[0] == null
        ? setTimeout(() => recursive(selector), 100)
        : $(selector)[0];

    // We know it's either null or anything not null. The "loose" not equal to (!=)
    // operator is sufficient enough for this operation as the value and types are obvious.
    if (form != null) {
      // Remove the unnecessary elements from the DOM
      $(selector + " .ihf-col-md-3 label").remove();
      $(selector + " .ihf-col-md-1:last-child").remove();

      // Refer to setNewPropertyTypes.js to know more about this function.
      // But in summary, what this does is it sets the default property type of the
      // IDX search widget to search for to whatever valid argument that we pass
      // to this function.
      setNewPropertyTypes(["SFR", "CND", "RNT"]);

      // Since the widget dynamically add and remove DOM elements based on events,
      // We're gonna listen when an element has been inserted. (e.g.: dropdown, select)
      form.addEventListener("DOMNodeInserted", function (e) {
        const links = form.querySelectorAll("ihf-select ul li a");

        for (let a of links) {
          // Then override the open in new tab behavior to default.
          a.target = "_self";
        }
      });
    }
  })("ihf-horizontal-quick-search form");
});
// </script>
