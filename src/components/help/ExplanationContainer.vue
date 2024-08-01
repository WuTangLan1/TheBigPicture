<!-- src\components\help\ExplanationContainer.vue -->
<template>
    <div class="explanation-container">
      <h2>Welcome to the Game!</h2>
      <p>Welcome to our interactive game where you navigate through challenges to win. Here's how to play:</p>
      <ul>
        <li>Select the correct tiles based on the hints provided.</li>
        <li>Each correct selection will turn green.</li>
        <li>Avoid incorrect choices to maintain your lives.</li>
        <li>Complete all selections correctly to win the game!</li>
      </ul>
    </div>
  </template>
  
  <style scoped>
 .explanation-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin: 0 auto 20px; 
    text-align: center;
    width: calc(100% - 70px); 
    max-width: 460px; 
    }

    .dark .explanation-container {
        background-color: #2e4058;
        color: #f9fafb; 
    }
  
  h2 {
    color: #4CAF50;
  }
  
  p, li {
    color: #333;
    font-size: 16px;
  }

  .dark p {
    color: #f9fafb; 
  }

  .dark li {
    color: #f9fafb; 
  }
  
  ul {
    text-align: left;
    margin-top: 10px;
  }
  </style>
  