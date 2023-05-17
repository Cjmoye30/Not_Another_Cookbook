$('.form-image-upload').on('submit', async (e) => {
    e.preventDefault();

    const recipe_name = $('#recipe_name').val();
    const description = $('#recipe_description').val();

    console.log(recipe_name);
    console.log(description);

})

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

// const name = document.getElementById("name");
// const files = document.getElementById("upload-files");
// const formData = new FormData();
// // // Creates empty formData object
// formData.append("name", name.value);
// // Appends value of text input
// for(let i =0; i < files.files.length; i++) {
//     formData.append("files", files.files[i]);
// }

// fetch('/api/users/multiple', {
//     method: 'POST',
//     body: formData, // Payload is formData object
// })

// alert("upload JS is connected!!!! that is what we were missing the entire time..................")


$('.new-recipe-form').on("submit", async (e) => {
    e.preventDefault();

    console.log("hello!!!!!!!!!")

    const newRecipeTitle = $('#recipe-title').val();
    const newRecipeDesc = $('#recipe-desc').val();

    console.log("New recipe form submit button clicked!");
    console.log(newRecipeTitle + "," + newRecipeDesc);
});