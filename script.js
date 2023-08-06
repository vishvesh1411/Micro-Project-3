document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const outputDiv = document.getElementById('output');
    
    submitButton.addEventListener('click', () => {
      const operation = document.getElementById('operation').value;
      fetch('food.json')
        .then(response => response.json())
        .then(foodsData => {
          const result = performOperation(operation, foodsData);
          displayResult(result);
        })
        .catch(error => {
          console.error('Error reading the file:', error);
        });
    });
    
    function performOperation(operation, foodsData) {
      switch (operation) {
        case 'foodItems':
          return foodsData.map(food => food.foodname);
        case 'vegetables':
          return foodsData.filter(food => food.category === 'Vegetable');
        case 'fruits':
          return foodsData.filter(food => food.category === 'Fruit');
        case 'proteinFoods':
          return foodsData.filter(food => food.category === 'Protein');
        case 'nuts':
          return foodsData.filter(food => food.category === 'Nuts');
        case 'grains':
          return foodsData.filter(food => food.category === 'Grains');
        case 'dairy':
          return foodsData.filter(food => food.category === 'Dairy');
        case 'above100Calories':
          return foodsData.filter(food => food.calorie > 100);
        case 'below100Calories':
          return foodsData.filter(food => food.calorie < 100);
        case 'highToLowProtein':
          return foodsData.slice().sort((a, b) => b.protiens - a.protiens);
        case 'lowToHighCarbs':
          return foodsData.slice().sort((a, b) => a.cab - b.cab);
        default:
          return [];
      }
    }
    
    function displayResult(data) {
      outputDiv.innerHTML = ''; // Clear previous results
      
      const resultDiv = document.createElement('div');
      const pre = document.createElement('pre');
      pre.textContent = JSON.stringify(data, null, 2);
      resultDiv.appendChild(pre);
      
      outputDiv.appendChild(resultDiv);
    }
  });
  