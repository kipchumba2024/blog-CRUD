fetch("https://xxx-w495.onrender.com/blogs", {
    method:"GET"
})
.then((response)=> response.json())
.then((data)=> {
    // utilize the data
    console.log(data);
    const all_blogs = document.getElementById("all_blogs")
    
    for(element of data){
       all_blogs.innerHTML += `<div  id="card">
         <img onclick="displaySingleBlog(${element.id})" src="${element.image}"
         <h6>${element.title}</h6>
         <button onclick="deleteBlog(${element.id})" id="deleteBtn">Delete</button>
         <button onclick="edit(${element.id})" >Edit</button>
         </div>`

    }


})


// display single blog
function displaySingleBlog(id)
{
    fetch(`https://xxx-w495.onrender.com/blogs/${id}`, {
    method:"GET"
    })
    .then((response)=> response.json())
    .then((data)=> {
        const single_blog = document.getElementById("single_blog")
        single_blog.innerHTML = `<div>
        <img src="${data.image}"
        <h6>${data.title}</h6>
        <p>${data.description}</p>
      </div>`

        console.log(data)
    })
}


// delete single blog
function deleteBlog(id)
{
    fetch(`https://xxx-w495.onrender.com/blogs/${id}`, {
    method:"DELETE"
    })
    .then((response)=> response.json())
    .then((data)=> {
        alert("Blog deleted Successfully")
    })
}

// Add blog
const addForm = document.getElementById("addForm")
addForm.addEventListener("submit", function(event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const image_url = document.getElementById("image_url").value;

    fetch(`https://xxx-w495.onrender.com/blogs`, {
        method:"POST",
        body: JSON.stringify({
            title: title,
            image: image_url,
            description: description
        }),
        headers: {
            "Content-Type": "application/json",
        }
        })
        .then((response)=> response.json())
        .then((data)=> {
            alert("Blog created")
        })


    console.log(title, " ", description, " ", image_url)
})

// edit function
function edit(id){
    fetch(`https://xxx-w495.onrender.com/blogs/${id}`)
    .then((response)=> response.json())
    .then((res)=> {
        console.log(res);
        const updateContainer = document.getElementById("updateContainer")
        updateContainer.innerHTML=`
        <h6>Update Form</h6>
        <div>
            <input type="text" id="update_title" value="${res.title}" placeholder="Enter Title">
            <input type="text" id="update_description" value="${res.description}" placeholder="Enter description">
            <input type="text" id="update_image_url" value="${res.image}" placeholder="Enter image url">
            <button onclick="update(${id})" type="submit">Update</button>
        </div>
        `
    })

}


function update(id){
    const update_title = document.getElementById("update_title").value;
    const update_description = document.getElementById("update_description").value;
    const update_image_url = document.getElementById("update_image_url").value;
    
    fetch(`https://xxx-w495.onrender.com/blogs/${id}`, {
        method:"PATCH",
        body: JSON.stringify({
            title: update_title,
            image: update_image_url,
            description: update_description
        }),
        headers: {
            "Content-Type": "application/json",
        }
        })
        .then((response)=> response.json())
        .then((data)=> {
            alert("Blog Updated")
        })
    console.log(update_title)

}
