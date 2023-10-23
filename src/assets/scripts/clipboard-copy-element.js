import '@github/clipboard-copy-element';

document.addEventListener('clipboard-copy', function (event) {
  let originalText = event.target.innerText;
  let confettiText = event.target.getAttribute('data-confetti-text');

  // Check if the View Transitions API is supported
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      event.target.innerText = confettiText;
      setTimeout(() => {
        event.target.innerText = originalText;
      }, 2000);
    });
  } else {
    // Fallback for browsers that don't support the View Transitions API
    event.target.innerText = confettiText;
    setTimeout(function () {
      event.target.innerText = originalText;
    }, 2000);
  }
});
