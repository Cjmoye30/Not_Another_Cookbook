$(".single-recipe-view").on("click", async (e) => {
    // replace with the single page recipe view by the ID of the button
    const recipeID = e.target.id;
    console.log(recipeID);

  window.location.replace(`/single-recipe-page-view/${recipeID}`)  
})
