
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé')
    const $triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
    const $dismissTriggers = document.querySelectorAll('[data-dismiss]')
    const $modalBground = document.getElementById('bground-opacity');
    const $mainContent = document.getElementById('main');
    const $inputs = document.querySelectorAll('.form-data__input');
    const $textArea = document.querySelector('.form-data__txtarea');

    const focusableEltArray = [
        '[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'img:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ];

    function openModal($modalToOpen, $bgroundToDisplay) {
        const focusableElts = $modalToOpen.querySelectorAll(focusableEltArray);
        const firstFocusableElt = focusableElts[0];
        const lastFocusableElt = focusableElts[focusableElts.length - 1];

        $mainContent.setAttribute('aria-hidden', true)
        $modalToOpen.setAttribute('aria-hidden', false)
        $bgroundToDisplay.style.display = 'block';
        firstFocusableElt.focus();

        if (!firstFocusableElt) {
            return;
        }

        // Focus inside modal
        focusableElts.forEach((focusableElement) => {
            if (focusableElement.addEventListener) {
                focusableElement.addEventListener('keydown', event => {
                    const tab = event.key === 'Tab';

                    if (!tab) {
                        return;
                    }

                    if (event.shiftKey) {
                        if (event.target === firstFocusableElt) {
                            event.preventDefault();

                            lastFocusableElt.focus();
                        }
                    } else if (event.target === lastFocusableElt) {
                        event.preventDefault();

                        firstFocusableElt.focus();
                    }
                })
            }
        })
    }

    function closeModal($modalToClose, $bgroundToHide, $triggerToFocus) {
        $mainContent.setAttribute('aria-hidden', false)
        $modalToClose.setAttribute('aria-hidden', true)
        $bgroundToHide.style.display = 'none';
        $triggerToFocus.focus();
    }

    // Managing open and close events
    $triggers.forEach(($trigger) => {
        const $dialog = document.getElementById($trigger.getAttribute('aria-controls'));

        // Open modal
        $trigger.addEventListener('click', event => {
            event.preventDefault();

            openModal($dialog, $modalBground)
        })

        $trigger.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();

                openModal($dialog, $modalBground)
            }
        })
    
        // Close modal
        $dismissTriggers.forEach(($dismissTrigger) => {
            const $dismissDialog = document.getElementById($dismissTrigger.dataset.dismiss);

            $dismissTrigger.addEventListener('click', event => {
                event.preventDefault();

                closeModal($dismissDialog, $modalBground, $trigger);
            })

            $dismissTrigger.addEventListener('keydown', event => {
                if (event.key === 'Enter') {
                    event.preventDefault();
    
                    closeModal($dismissDialog, $modalBground, $trigger)
                }
            })

            $dismissDialog.addEventListener('keyup', event => {
                if (event.key === 'Escape') {
                    event.preventDefault();
    
                    closeModal($dismissDialog, $modalBground, $trigger);
                }
            })

            // Send form - cancel refresh
            $dismissDialog.onsubmit = (event) => {
                var inputsValue = "";
                $inputs.forEach(($input) => {
                    inputsValue += $input.value + ", ";
                })
                console.log(inputsValue + $textArea.value);

                event.preventDefault();
                closeModal($dismissDialog, $modalBground, $trigger);
            }
        })
    })
})






















/*function displayModal() {
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


}*/

/*function closeModal() {
    const $modal = document.getElementById("bground-opacity");
    const $mainHidden = document.getElementById("main");
    const $contactForm = document.getElementById("contactform");
    const $contactBtn = document.querySelector(".contact-btn");

    $modal.style.display = "none";
    $mainHidden.setAttribute("aria-hidden", "false");
    $contactForm.setAttribute("aria-hidden", "true");
    $contactBtn.focus()
}
*/
