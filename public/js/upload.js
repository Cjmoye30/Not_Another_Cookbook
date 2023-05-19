

$('.form-image-upload').on("submit", async (e) => {
    e.preventDefault();

    console.log("the form-image-upload button was clicked!");

    const imageData = {
        recipe_name: $('#recipe_name').val(),
        description: $('#recipe_description').val(),
    };

    console.log(imageData);

    const response = await fetch('api/users/multiple', {
        method: "POST",
        body: JSON.stringify(imageData),
        headers: {
            "Content-Type": "application/json"
        }
    })
});

$('.new-recipe-form').on("submit", async (e) => {
    e.preventDefault();

    const newRecipeObj = {
        recipe_name: $('#recipe_name').val(),
        description: $('#recipe_desc').val(),
    }

    const response = await fetch('api/users/create-recipe', {
        method: "POST",
        body: JSON.stringify(newRecipeObj),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response);

    if (response.ok) {
        console.log("we are good to proceed!")
    } else {
        console.log("Something went wrong")
    }
});

// Add additional fields for recipe items
$(".add-1-recipe-item").on("click", () => {

    const newDiv = $("<div>").addClass("ingredient-entry row");
    const newInputItem = $("<input>").attr("type", "text").addClass("form-control recipe-item col col-6");
    const newQtyItem = $("<input>").attr("type", "text").addClass("form-control recipe-qty col col-1");
    newDiv.append(newInputItem).append(newQtyItem);
    $(".ingredients-row2").append(newDiv);

});

$(".add-5-recipe-item").on("click", () => {
    // loop 5x
    for (let i = 0; i < 5; i++) {
        const newDiv = $("<div>").addClass("ingredient-entry row");
        const newInputItem = $("<input>").attr("type", "text").addClass("form-control recipe-item col col-6");
        const newQtyItem = $("<input>").attr("type", "text").addClass("form-control recipe-qty col col-1");
        newDiv.append(newInputItem).append(newQtyItem);
        $(".ingredients-row2").append(newDiv);
    }
});

$(".add-10-recipe-item").on("click", () => {
    // loop 10x
    for (let i = 0; i < 10; i++) {
        const newDiv = $("<div>").addClass("ingredient-entry row");
        const newInputItem = $("<input>").attr("type", "text").addClass("form-control recipe-item col col-6");
        const newQtyItem = $("<input>").attr("type", "text").addClass("form-control recipe-qty col col-1");
        newDiv.append(newInputItem).append(newQtyItem);
        $(".ingredients-row2").append(newDiv);
    }
});

// check button to validate what I'm doing
$(".check-btn").on("click", () => {
    // whenever the user deletes out anything, I can have something that then re-runs the array to update the list
    const ingredientsLen = $(".recipe-item").length;
    const ingredient = $(".recipe-item");
    const ingredientQty = $(".recipe-qty");
    const ingredientObjArray = [];

    // push all data into an array
    for (let i = 0; i < ingredientsLen; i++) {
        const recipeObj = {
            item: $(ingredient[i]).val(),
            qty: $(ingredientQty[i]).val()
        };
        ingredientObjArray.push(recipeObj)
    };

    // filter the array to eliminate any blanks
    console.log(ingredientObjArray);
    const finalArr = ingredientObjArray.filter(element => {
        if (element.item !== "" && element.qty !== "") {
          return true;
        }
        return false;
      });
    console.log(finalArr);
    console.log(JSON.stringify(finalArr));

});

// on button click - hit the upload ingredient route
$(".upload-ingredients").on("click", async () => {
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
    const response = await fetch('api/users/upload-ingredients/:id', {
        method: "PUT",
        body: JSON.stringify(finalArr),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response);

    if (response.ok) {
        console.log("we are good to proceed!")
    } else {
        console.log("Something went wrong")
    }

});

// check ingredients fields
$(".check-btn-ingredients").on("click", async () => {
    const instructionsLen = $(".recipe-instruction").length;
    console.log(instructionsLen);

    const instructions = $(".recipe-instruction");
    const instructionsArr = [];

    for (let i = 0; i < instructionsLen; i++) {
        const item = $(instructions[i]).val()
        instructionsArr.push(item);
    };
    console.log("Instructions Array: ",instructionsArr);

    // filter the array to eliminate any blanks
    const finalArr = instructionsArr.filter(element => {
        if (element !== "") {
          return true;
        }
        return false;
      });

      console.log("Final Instructions Array", finalArr);
});