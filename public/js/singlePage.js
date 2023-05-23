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

})