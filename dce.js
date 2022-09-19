/**
 * DANGER: DO NOT USE WITH USER INPUTS.
 * Helper function for creating DOM tree elements.
 * Similarly to React.createElement() method but simpler and lesser moving parts.
 * @param tag {String}
 * @param className {String}
 * @param contents {HTMLElement | Array<HTMLElement>}
 * @param attrs {Object}
 * @returns {HTMLElement}
 */
function dce(tag, className, contents, attrs) {
  let el = document.createElement(tag);
  el.className = className == null ? "" : className;

  if (attrs)
    Object.entries(attrs).forEach(([key, value] = props) =>
      el.setAttributeNS("", key, value)
    );

  if (contents == null) return el;

  // DANGEROUSLY set innerHTML. Beware and be sure to not use it in forms.
  let write = (item) =>
    typeof item == "string" ? (el.innerHTML = item) : el.appendChild(item);

  Array.isArray(contents)
    ? contents.forEach((item) => write(item))
    : write(contents);

  return el;
}

// Just adding it to communicate that this is used by other files.
// In the actual setting, this pattern isn't used.
export default dce;
