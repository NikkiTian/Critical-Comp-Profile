function saveAndNext(questionKey, value, nextPage) {
    localStorage.setItem(questionKey, value);
    window.location.href = nextPage;
  }
  