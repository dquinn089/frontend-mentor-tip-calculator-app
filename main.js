document.addEventListener('DOMContentLoaded', function() {
    
    // Handle tip option selection
    document.querySelectorAll('.tip-options-list li').forEach(item => {
        item.addEventListener('click', function() {
            // Toggle the "selected" class
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                document.querySelectorAll('.tip-options-list li').forEach(li => li.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
    });

    // Selecting elements
    const billInput = document.getElementById("bill-input");
    const peopleInput = document.getElementById("people-input");
    const peopleErrorMessage = document.getElementById("people-error");
    const tipOptions = document.querySelectorAll('.tip-options-list li');
    const customTipInput = document.getElementById("custom");
    const tipAmountDisplay = document.getElementById("tip-amount");
    const totalAmountDisplay = document.getElementById("total-amount");
    const resetButton = document.querySelector("button");

    // Function to calculate the tip
    function calculateTip() {
        const billValue = parseFloat(billInput.value);
        const peopleValue = parseInt(peopleInput.value);
        let tipPercentage = 0;

        // Check which tip option is selected
        tipOptions.forEach(item => {
            if (item.classList.contains('selected') && item.innerText.includes('%')) {
                tipPercentage = parseFloat(item.innerText) / 100;
            }
        });

        // If custom tip is selected and provided
        if (customTipInput.value && customTipInput.parentElement.classList.contains('selected')) {
            const customTipValue = parseFloat(customTipInput.value);
            if (!isNaN(customTipValue) && customTipValue > 0) {
                tipPercentage = customTipValue / 100;
            }
        }

        // Basic validation
        if (isNaN(billValue) || billValue <= 0) {
            alert("Please enter a valid bill amount.");
            return;
        }

        if (isNaN(peopleValue) || peopleValue <= 0) {
            peopleErrorMessage.textContent = "Can't be zero";
            peopleErrorMessage.style.display = 'block';
            peopleInput.classList.add('invalid');
            return;
        } else {
            peopleErrorMessage.style.display = 'none';
            peopleInput.classList.remove('invalid');
        }

        // Calculate total tip and per person amounts
        const totalTip = billValue * tipPercentage;
        const tipPerPerson = totalTip / peopleValue;
        const totalPerPerson = (billValue + totalTip) / peopleValue;

        // Display results
        tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
    }

    // Add event listeners
    billInput.addEventListener('input', calculateTip);
    peopleInput.addEventListener('input', calculateTip);
    tipOptions.forEach(item => item.addEventListener('click', calculateTip));
    customTipInput.addEventListener('input', calculateTip);
    
    // Reset button functionality
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Clear inputs and reset values
            billInput.value = '';
            peopleInput.value = '';
            customTipInput.value = '';
            tipOptions.forEach(li => li.classList.remove('selected'));
            tipAmountDisplay.textContent = '$0.00';
            totalAmountDisplay.textContent = '$0.00';
            peopleErrorMessage.style.display = 'none';
            peopleInput.classList.remove('invalid');
        });
    }

});
