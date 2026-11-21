// Name, Other Search Terms, Symbol, KG, M, S, A, K, mol, cd
const units = [
    ["Time", "period seconds", "t", 0, 0, 1, 0, 0, 0, 0],
    ["Frequency", "hertz lambda", "λ", 0, 0, -1, 0, 0, 0, 0],
    ["Distance", "displacement metres position", "s", 0, 1, 0, 0, 0, 0, 0],
    ["Area", "", "A", 0, 2, 0, 0, 0, 0, 0],
    ["Volume", "", "V", 0, 3, 0, 0, 0, 0, 0],
    ["Speed", "fastness velocity", "v", 0, 1, -1, 0, 0, 0, 0],
    ["Momentum", "", "p", 1, 1, -1, 0, 0, 0, 0],
    ["Acceleration", "", "a", 0, 1, -2, 0, 0, 0, 0],
    ["Spr. Constant", "spring constant", "k", 1, 0, -2, 0, 0, 0, 0],

    ["Mass", "kilograms kg", "m", 1, 0, 0, 0, 0, 0, 0],
    ["Density", "rho", "ρ", 1, -3, 0, 0, 0, 0, 0],
    ["Force", "push pull newtons", "F", 1, 1, -2, 0, 0, 0, 0],
    ["Pressure", "pascals", "p", 1, -1, -2, 0, 0, 0, 0],
    ["Energy", "enthalpy joules", "E", 1, 2, -2, 0, 0, 0, 0],
    ["Power", "watts", "P", 1, 2, -3, 0, 0, 0, 0],
    
    ["Current", "amps amperes", "I", 0, 0, 0, 1, 0, 0, 0],
    ["Charge", "coulombs", "Q", 0, 0, 1, 1, 0, 0, 0],
    ["Voltage", "potential difference", "V", 1, 2, -3, -1, 0, 0, 0],
    ["Resistance", "", "R", 1, 2, -3, -2, 0, 0, 0],
]

// Unit index in list, quantity
let inputs = [];

function searchQuantities(query) {
    let table = document.getElementById("table-search");
    table.innerHTML = "";
    if (query == "") {
        document.getElementById("button-search-clear").style.display = "none";
        return;
    }
    document.getElementById("button-search-clear").style.display = "";

    let i = 0;
    for (let unit of units) {
        if ((unit[0]+unit[1]).toLowerCase().includes(query.toLowerCase()) || query == "*") {
            table.innerHTML += `
            <div class="tr" tabindex="0" id="table-search-tr-${i}">
                <div class="tr-symbol">${unit[2]}</div>
                <div class="tr-title">${unit[0]}</div>
                <div class="tr-unit">
                    <div class="kg">${
                        unit[3]==0?"":
                        unit[3]==1?"kg":
                        "kg<sup>"+unit[3]+"</sup>"
                    }</div>
                    ${unit[4]!=0 && unit[3]!=0 ? "<div class='space'></div>":""}
                    <div class="m">${
                        unit[4]==0?"":
                        unit[4]==1?"m":
                        "m<sup>"+unit[4]+"</sup>"
                    }</sup></div>
                    ${unit[5]!=0 && (unit[4]!=0 || unit[3]!=0) ? "<div class='space'></div>":""}
                    <div class="s">${
                        unit[5]==0?"":
                        unit[5]==1?"s":
                        "s<sup>"+unit[5]+"</sup>"
                    }</div>
                    ${unit[6]!=0 && (unit[5]!=0 || unit[4]!=0 || unit[3]!=0) ? "<div class='space'></div>":""}
                    <div class="a">${
                        unit[6]==0?"":
                        unit[6]==1?"A":
                        "A<sup>"+unit[6]+"</sup>"
                    }</div>
                </div>
                <div class="tr-add">+</div>
            </div>`
        }
        i++;
    }

    for (let j=0; j<i; j++) {
        if (document.getElementById(`table-search-tr-${j}`)) {
            document.getElementById(`table-search-tr-${j}`).addEventListener("click", function() {addUnitNumber(j)})
        }
    }
}

searchQuantities("");
document.getElementById("input-search").addEventListener("input", function(){searchQuantities(document.getElementById("input-search").value)});
document.getElementById("button-search-clear").addEventListener("click", function(){searchQuantities("");document.getElementById("input-search").value=""});
document.getElementById("button-inputs-all").addEventListener("click", function(){searchQuantities("*");document.getElementById("input-search").value="*"});

function addUnitNumber(index) {
    document.getElementById("input-search").value = "";
    searchQuantities(""); // Clear search array list
    inputs.push([index, 0]);
    showInputs();
}

function showInputs() {
    let inputList = document.getElementById("table-inputs");
    inputList.innerHTML = "";
    let i = 0;
    for (let input of inputs) {
        let unit = units[input[0]];
        let quantity = input[1];
        inputList.innerHTML += `
        <div class="tr" id="table-inputs-tr-${i}">
            <div class="tr-symbol">${unit[2]}</div>
            <div class="tr-title">${unit[0]}</div>
            <input id="tr-number-${i}" class="tr-number" placeholder="Number" value="${quantity}">
            <div class="tr-unit">
                <div class="kg">${
                    unit[3]==0?"":
                    unit[3]==1?"kg":
                    "kg<sup>"+unit[3]+"</sup>"
                }</div>
                ${unit[4]!=0 && unit[3]!=0 ? "<div class='space'></div>":""}
                <div class="m">${
                    unit[4]==0?"":
                    unit[4]==1?"m":
                    "m<sup>"+unit[4]+"</sup>"
                }</sup></div>
                ${unit[5]!=0 && (unit[4]!=0 || unit[3]!=0) ? "<div class='space'></div>":""}
                <div class="s">${
                    unit[5]==0?"":
                    unit[5]==1?"s":
                    "s<sup>"+unit[5]+"</sup>"
                }</div>
                ${unit[6]!=0 && (unit[5]!=0 || unit[4]!=0 || unit[3]!=0) ? "<div class='space'></div>":""}
                <div class="a">${
                    unit[6]==0?"":
                    unit[6]==1?"A":
                    "A<sup>"+unit[6]+"</sup>"
                }</div>
            </div>
            <div id="tr-close-${i}" class="tr-close" tabindex="0">X</div>
        </div>`
        i++;
    }

    // Remove input
    for (let i=0; i<inputs.length; i++) {
        document.getElementById(`tr-close-${i}`).addEventListener("click", function() {removeInputNumber(i)});
        document.getElementById(`tr-number-${i}`).addEventListener("input", calculate);
    }

    // Calculate answer as inputs are changed
    calculate();
}

function removeInputNumber(index) {
    inputs.splice(index, 1);
    showInputs();
}

function calculate() {
    // Get numerical values from tr-number into inputs
    for (let i=0; i<inputs.length; i++) {
        inputs[i][1] = parseFloat(document.getElementById(`tr-number-${i}`).value);
    }

    // Calculate
    console.log("CALCULATING...")
    let table = document.getElementById("table-answer");
    table.innerHTML = "";
    for (let unit of units) {
        if (inputs.some((input) => units[input[0]][0] == unit[0])) {
            continue
        }
        let unitDimensions = structuredClone(unit);
        unitDimensions.shift();
        unitDimensions.shift();
        unitDimensions.shift();
        let result = search(0, [0, 0, 0, 0, 0, 0, 0], [], unitDimensions);
        if (result[0]) { // == true (unit can be calculated)

            // Calculate using operations derived from search()
            let currentAnswer = 1; // Multiplicative identity
            for (let step of result[1]) {
                // Actually calculate the answer
                let calc = step[1]
                let number = inputs[step[0]][1];
                if (calc == 1) {
                    currentAnswer = currentAnswer * number;
                } else if (calc == -1) {
                    currentAnswer = currentAnswer / number;
                } else if (calc == 2) {
                    currentAnswer = currentAnswer * number * number;
                } else if (calc == -2) {
                    currentAnswer = currentAnswer / number / number;
                } else if (calc == 3) {
                    currentAnswer = currentAnswer * number * number * number;
                } else if (calc == -3) {
                    currentAnswer = currentAnswer / number / number / number;
                }
            }

            // Display on screen
            table.innerHTML += `
            <div class="tr">
                <div class="tr-symbol">${unit[2]}</div>
                <div class="tr-title">${unit[0]}</div>
                <div class="tr-number">${currentAnswer}</div>
                <div class="tr-unit">
                    <div class="kg">${
                        unit[3]==0?"":
                        unit[3]==1?"kg":
                        "kg<sup>"+unit[3]+"</sup>"
                    }</div>
                    ${unit[4]!=0 && unit[3]!=0 ? "<div class='space'></div>":""}
                    <div class="m">${
                        unit[4]==0?"":
                        unit[4]==1?"m":
                        "m<sup>"+unit[4]+"</sup>"
                    }</sup></div>
                    ${unit[5]!=0 && (unit[4]!=0 || unit[3]!=0) ? "<div class='space'></div>":""}
                    <div class="s">${
                        unit[5]==0?"":
                        unit[5]==1?"s":
                        "s<sup>"+unit[5]+"</sup>"
                    }</div>
                    ${unit[6]!=0 && (unit[5]!=0 || unit[4]!=0 || unit[3]!=0) ? "<div class='space'></div>":""}
                    <div class="a">${
                        unit[6]==0?"":
                        unit[6]==1?"A":
                        "A<sup>"+unit[6]+"</sup>"
                    }</div>
                </div>
            </div>`
        }
    }
}

function search(currentInput, currentUnit, currentCalculation, targetUnit) {
    // Recursive
    // Uses globals "inputs" and "units"

    let targetFound = true;
    for (let i=0; i<currentUnit.length; i++) {
        if (currentUnit[i] !== targetUnit[i]) {
            targetFound = false;
            break;
        }
    }

    if (targetFound) {
        // BASE CASE - target unit found
        return [true, currentCalculation]
    } else if (currentInput == inputs.length) {
        // BASE CASE - all inputs manipulated
        return [false, null]
    } else {
        // RECURSION
        let calculationSteps = [0, 1, -1, 2, -2, 3, -3];
        // Try nothing first, then multiplication, division, square multiplication etc.
        for (let calculationStep of calculationSteps) {
            // Loop through each calculation operator, manipulating the exponents of the unit
            let newUnit = structuredClone(currentUnit);

            // For each dimension of the unit...
            for (let i=0; i<currentUnit.length; i++) {
                let inputUnitIndex = inputs[currentInput][0]
                newUnit[i] = currentUnit[i] + (calculationStep * parseFloat(units[inputUnitIndex][i+3]));
                // Add or subtract (or add the double etc.) from the currentUnit
                // Offset by 3 to avoid the name, search terms and symbol in "inputs"
            }
            let newBranchCalculation = structuredClone(currentCalculation);
            newBranchCalculation.push([currentInput, calculationStep]);
            let newInput = currentInput + 1;

            let result = search(newInput, newUnit, newBranchCalculation, targetUnit);
            if (result[0]) { // == true
                return result
            } // else {continue}
        }
        return [false, null]
    }
}