// Always wrap to IIFE to avoid global variable collisions.
!(function () {
  let iframeResizerLink =
    "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js";
  dmAPI.loadScript(iframeResizerLink, function () {
    let listing = document.getElementById("listing");
    let IDXLink;

    // When there's no data in query params, .split() method do often throws an error.
    try {
      // Since some links makes the base64 padding in the end converts to a URI syntax,
      // we have to decode it twice to get the proper value.
      IDXLink = decodeURIComponent(
        atob(decodeURIComponent(window.location.search.split("data=")[1]))
      );
    } catch (e) {
      IDXLink = null;
    }

    if (IDXLink == null) {
      let message = document.createElement("h1");
      message.innerText = "Listing Not Found.";
      message.className = "listing-not-found";
      listing.parentElement.parentElement.parentElement.parentElement.style.background =
        "#101010";

      let returnToHome = document.createElement("a");
      returnToHome.innerText = "Return to homepage";
      returnToHome.className = "return-to-home";
      returnToHome.href = "/";

      let returnToHomeDiv = document.createElement("div");
      returnToHomeDiv.className = "return-to-home-div";
      returnToHomeDiv.appendChild(returnToHome);
      listing.appendChild(message);
      listing.appendChild(returnToHomeDiv);

      return; // immediately finish this callback function.
    }

    let iframe = document.createElement("iframe");
    iframe.src = IDXLink;
    iframe.style.width = "100%";
    iFrameResize({}, iframe);
    listing.appendChild(iframe);

    // Since the styling of the header and the incoming IDX page has different
    // background colors, we'll be changing the headers background to fit
    document.querySelector("#hcontainer.dmHeader").style.cssText =
      "background: #101010 !important";
  });
})();
