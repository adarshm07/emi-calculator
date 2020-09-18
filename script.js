document.addEventListener('DOMContentLoaded', calculateEMI);

const principalRange = document.getElementById('principalAmountRS');
const interestRange = document.getElementById('interestRange');
const tenureRange = document.getElementById('tenureRange');

const principalInput = document.getElementById('principalAmountInput');
const interestInput = document.getElementById('interestInput');
const tenureInput = document.getElementById('tenureInput');

// Equal Value for inputs
function isPrincipal(x) {
  principalRange.value = x;
  principalInput.value = x.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  calculateEMI();
}

function isInterest(y) {
  interestRange.value = y;
  interestInput.value = y;
  calculateEMI();
}

function isTenure(z) {
  tenureRange.value = z;
  tenureInput.value = z;
  calculateEMI();
}

function calculateEMI() {
  let interestAmount = (interestRange.value / 100 / 12);
  // interestAmount = interestAmount.toFixed(2);
  let monthlyEMI = (((principalRange.value) * interestAmount * Math.pow(1 + interestAmount, (tenureRange.value))) / (Math.pow(1 + interestAmount, (tenureRange.value)) - 1)).toFixed(0);
  let totalInterest = ((monthlyEMI * tenureRange.value) - principalRange.value);

  // ChartJS
  (function() {

    var ctx = document.getElementById("myChart").getContext('2d');
    var blueColor = parseInt(document.getElementById('principalAmountRS').value);
    var orangeColor = monthlyEMI;

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        options: {
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            cutoutPercentage: 70,
          legend: {
              display: false,
          },
          tooltips: {
                  enabled: true
              }
          },
        data: {
          labels: ["Green", "Blue"],
          datasets: [{
            backgroundColor: [
              "#294e9b",
              "#ff7000" 
            ],
            data: [blueColor,orangeColor]
          }]
        }
      });
    })()

    // Display value
    document.getElementsByClassName('output__value')[0].innerHTML = principalRange.value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    document.getElementsByClassName('output__value')[1].innerHTML = totalInterest.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    document.getElementsByClassName('output__value')[2].innerHTML = monthlyEMI.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
}