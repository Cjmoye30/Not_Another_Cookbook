// $(".single-recipe-view").on("click", async (e) => {
//     alert("Connected")

//     const recipeId = e.target.id;
//     console.log(recipeId);

//     const response = await fetch('/single-recipe-page-view')

//     // render a page with the id of the button
// });

$(".single-recipe-view").on("click", async (e) => {
    // replace with the single page recipe view by the ID of the button
    const recipeID = e.target.id;
    console.log(recipeID);

  window.location.replace(`/single-recipe-page-view/${recipeID}`)  
})
