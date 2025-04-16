function saveAndNext(questionKey, value, nextPage) {
    localStorage.setItem(questionKey, value);
    window.location.href = nextPage;
  }
  
////specifically for question 9 that determines 
// the exact beer brand based on... well nothing
function submitAnswer(value) {
  localStorage.setItem('q9', value);
  window.location.href = 'result.html';
}