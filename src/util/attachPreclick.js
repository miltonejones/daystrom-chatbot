/**
 * Attaches a click event listener to all <pre> tags in the document, invoking the specified click handler when a tag is clicked.
 * @function attachPreclick
 * @param {function} handleClick - The click event handler to be attached to the <pre> tags.
 */
export const attachPreclick = (handleClick) => {
  const preTags = document.querySelectorAll("pre");
  preTags.forEach((tag) => {
    tag.addEventListener("click", handleClick);
  });
};
