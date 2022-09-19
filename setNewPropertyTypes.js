/**
 * Main problem: At the moment that the IDX search is being implemented,
 * iHomefinder IDX search embed script does not have any ways to easily select
 * a property type on load. There's no query params available too for that kind
 * of options and the default selected options are only for
 * Condo and Residential properties.
 *
 * In this solution, I explored the internal mechanisms of AngularJS ngContext
 * in order to properly select a default property type to search for on widget load.
 *
 * The embed script provided was made using AngularJS. Since it is an embed script,
 * There's no way to modify the source code directly. They also didn't expose any
 * hidden APIs or ways like a query param or optional init script to adjust the behavior
 * of the search widget. The query params do only have minimal options to choose from.
 *
 * Desired behavior: The goal here was to let the search widget select different
 * types of property (e.g.: Condo and Rental only) by default when it loads.
 * It saves the widget user some time to select their desired property types
 * when searching properties.
 *
 * Note: At that moment, I only do have a minimal experience working with AngularJS.
 *
 * IDX search embed script:
 * <script src="https://www.idxhome.com/site/listing/search/widget/CLIENT-ID?style=horizontal&showPropertyType=true">
 * </script>
 *
 * Given with this DOM elements that comes from the embed script
 * which has document.write() implementation method:
 * <ihf-horizontal-quick-search>
 *     <form action="">
 *         <div class="ihf-col-md-2">
 *             <label for="">
 *                 <ihf-select></ihf-select>
 *             </label>
 *         </div>
 *     </form>
 * </ihf-horizontal-quick-search>
 *
 * Where <ihf-select> holds the default selected propertyTypes
 */

// Let's say, we want the IDX search to look for Condo and Rental properties only
setNewPropertyType(["CND", "RNT"]);

/**
 * Clears and selects a new propertyType.
 * Values for types:
 * "COM": Commercial
 * "CND": Condo
 * "SFR": House
 * "LL": Lots / Land
 * "MH": Mobile Home
 * "RI": Multi-Unit Residential
 * "RNT": Rental
 * @param {array} propertyTypes - propertyType value/s.
 */
function setNewPropertyType(propertyTypes) {
  // Selects the <ihf-select> DOM
  const selector = $(
    "ihf-horizontal-quick-search form .ihf-col-md-2 label ihf-select"
  )[0];

  // Selects the propertyType value from its proper index value
  const types = selector.__ngContext__[getNgCtxPropertyTypesIndex()];

  // Unselect all the default propertyTypes
  types.selectedOptions = [];

  propertyTypes.forEach((type) => {
    // Get the current indexes of the available types based on the selector
    const indexOfType = types.options
      .map((option) => option.value == type)
      .indexOf(type);

    // Selects the type based on its index.
    // This will trigger an update to AngularJS's ngContext internal mechanisms
    types.options[indexOfType].selected = true;
  });

  function getNgCtxPropertyTypesIndex() {
    // Scans __ngContext__ for an object that has { name: 'propertyType' }
    // and take its current index value
    return selector.__ngContext__
      .map((item) =>
        typeof item == "object" ? { ...item }.name == "propertyType" : ""
      )
      .indexOf(true);
  }
}
