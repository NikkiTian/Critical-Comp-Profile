function chooseCategory(category) {
    localStorage.setItem("selectedCategory", category);
    window.location.href = "draw.html";
}