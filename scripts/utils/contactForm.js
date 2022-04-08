function displayModal() {
    const $modal = document.getElementById("bground-opacity");
    const $mainHidden = document.getElementById("main");
    const $contactForm = document.getElementById("contactform");
    const $closeBtn = document.getElementById("close-modal-btn");
    

	$modal.style.display = "block";
    $mainHidden.setAttribute("aria-hidden", "true");
    $contactForm.setAttribute("aria-hidden", "false");
    $closeBtn.focus();
    
    // Close modal when espace key is pressed
document.addEventListener('keydown', event => {
    const keyCode = event.keyCode ? event.keyCode : event.which
  
    if ($contactForm.hasAttribute("aria-hidden", "false") && keyCode === 27) {
        closeModal()
    }
 })


}

function closeModal() {
    const $modal = document.getElementById("bground-opacity");
    const $mainHidden = document.getElementById("main");
    const $contactForm = document.getElementById("contactform");
    const $contactBtn = document.querySelector(".contact-btn");

    $modal.style.display = "none";
    $mainHidden.setAttribute("aria-hidden", "false");
    $contactForm.setAttribute("aria-hidden", "true");
    $contactBtn.focus()
}

