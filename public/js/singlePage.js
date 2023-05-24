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
$(".save-ingredients").on("click", async (e) => {
    const recipeID = e.target.id;

    const ingredientsLen = $(".recipe-item").length;
    const ingredient = $(".recipe-item");
    const ingredientQty = $(".recipe-qty");
    const ingredientObjArray = [];

    for (let i = 0; i < ingredientsLen; i++) {
        const recipeObj = {
            item: $(ingredient[i]).val(),
            qty: $(ingredientQty[i]).val()
        };
        ingredientObjArray.push(recipeObj)
    };
    console.log(ingredientObjArray);
    const finalArr = ingredientObjArray.filter(element => {
        if (element.item !== "" && element.qty !== "") {
            return true;
        }
        return false;
    });
    console.log(finalArr);
    console.log(JSON.stringify(finalArr));

    // send the final array to the backend
    // add in the id of the current recipe we're using
    const response = await fetch(`/api/users/update-recipe-ingredients/${recipeID}`, {
        method: "PUT",
        body: JSON.stringify(finalArr),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response);

    if (response.ok) {
        window.location.reload()
    } else {
        console.log("Something went wrong")
    }
});

// Add additional fields for recipe items
$(".add-1-recipe-item").on("click", () => {

    const newLi = $("<li>").addClass("list-group-item")
    const newDiv = $("<div>").addClass("ingredient-entry row");
    const newInputItem = $("<input>").attr("type", "text").addClass("recipe-item col col-8");
    const newQtyItem = $("<input>").attr("type", "text").addClass("recipe-qty col col-4");

    newDiv.append(newInputItem).append(newQtyItem);
    newLi.append(newDiv);
    $(".ingredients-entry-container").append(newLi);

});

$(".add-5-recipe-item").on("click", () => {
    // loop 5x
    for (let i = 0; i < 5; i++) {
        const newLi = $("<li>").addClass("list-group-item")
        const newDiv = $("<div>").addClass("ingredient-entry row");
        const newInputItem = $("<input>").attr("type", "text").addClass("recipe-item col col-8");
        const newQtyItem = $("<input>").attr("type", "text").addClass("recipe-qty col col-4");
        newDiv.append(newInputItem).append(newQtyItem);
        newLi.append(newDiv);
        $(".ingredients-entry-container").append(newLi);
    }
});

// update recipe instructions
$(".save-instructions").on("click", async (e) => {

    const recipeID = e.target.id;

    const instructionsLen = $(".recipe-instruction").length;
    console.log(instructionsLen);

    const instructions = $(".recipe-instruction");
    const instructionsArr = [];

    for (let i = 0; i < instructionsLen; i++) {
        const item = $(instructions[i]).val()
        instructionsArr.push(item);
    };
    console.log("Instructions Array: ", instructionsArr);

    // filter the array to eliminate any blanks
    const finalArr = instructionsArr.filter(element => {
        if (element !== "") {
            return true;
        }
        return false;
    });

    console.log("Final Instructions Array", finalArr);

    // send the final array to the backend
    // add in the id of the current recipe we're using
    const response = await fetch(`/api/users/update-instructions/${recipeID}`, {
        method: "PUT",
        body: JSON.stringify(finalArr),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response);

    if (response.ok) {
        console.log("we are good to proceed!")
        window.location.reload();
    } else {
        console.log("Something went wrong")
    }
});

// add additional fields for recipe instructiosn
$(".add-1-instruction-item").on("click", () => {

    const newli = $("<li>");
    const newDiv = $("<div>").addClass("ingredient-entry");
    const newInputItem = $("<textarea>").addClass("form-control recipe-instruction col col-12").attr("rows", "3");

    newDiv.append(newInputItem);
    newli.append(newDiv);

    $(".instructions-list").append(newli);

})
$(".add-5-instruction-item").on("click", () => {

    for (let i = 0; i < 5; i++) {
        const newli = $("<li>");
        const newDiv = $("<div>").addClass("ingredient-entry");
        const newInputItem = $("<textarea>").addClass("form-control recipe-instruction col col-12").attr("rows", "3");

        newDiv.append(newInputItem);
        newli.append(newDiv);

        $(".instructions-list").append(newli);
    }

});