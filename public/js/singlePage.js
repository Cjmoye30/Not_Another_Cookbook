$(".image-delete-button").on("click", async (e) => {
    const imageID = e.target.id
    console.log(imageID);
    console.log("delete button clicked")

    // call the delete route and pass in the ID
    const response = await fetch(`/api/users/delete-image/${imageID}`, {
        method: "DELETE"
    });

    if (response.ok) {
        window.location.reload();
    } else {
        console.log("Something went wrong")
    }

});

// update recipe title and description
$(".save-title-desc").on("click", async (e) => {

    const newRecpieName = $("#newRecipeName");
    const newRecipeDesc = $("#newRecipeDesc");
    const recipeID = e.target.id;

    const recipeObj = {
        recipe_name: newRecpieName.val(),
        description: newRecipeDesc.val()
    };

    console.log("Recipe Object: ", recipeObj)
    
    const response = await fetch(`/api/users/update-title-desc/${recipeID}`, {
        method: "PUT",
        body: JSON.stringify(recipeObj),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.success) {
        window.location.reload()
    }  else {
        console.log("Something went wrong! Try again!")
    }

});

// update recipe ingredients

// update recipe instructions