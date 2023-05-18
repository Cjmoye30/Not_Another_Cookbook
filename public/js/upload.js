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

// const name = document.getElementById("name");
// const files = document.getElementById("upload-files");
// const formData = new FormData();
// // // Creates empty formData object
// formData.append("name", name.value);
// // Appends value of text input
// for (let i = 0; i < files.files.length; i++) {
//     formData.append("files", files.files[i]);
// }

// fetch('/api/users/multiple', {
//     method: 'POST',
//     body: formData, // Payload is formData object
// })

// const recipe_name = $('#recipe_name').val();
// const description = $('#recipe_description').val();

// console.log(recipe_name);
// console.log(description);



// on submit, we need to create a new image to the database which contains the file.pathname
// const respone = await fetch('/api/users/multiple', {
//     method: 'POST',
//     body: JSON.stringify(recipeData),
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

// const responeData = await respone.json();
// console.log(responeData);



// alert("upload JS is connected!!!! that is what we were missing the entire time..................")


$('.new-recipe-form').on("submit", async (e) => {
    e.preventDefault();

    const newRecipeObj = {
        recipe_name: $('#recipe_name').val(),
        description: $('#recipe_desc').val(),
    }

    // console.log(newRecipeObj);

    // send a request to the backend, if success, then show the image upload option or the other steps in the process

    const response = await fetch('api/users/create-recipe', {
        method: "POST",
        body: JSON.stringify(newRecipeObj),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response);

    if(response.ok) {
        console.log("we are good to proceed!")
    } else {
        console.log("Something went wrong")
    }
});