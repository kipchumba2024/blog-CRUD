fetch("http://localhost:3000/blogs", {
    method:"GET"
})
.then((response)=> response.json())
.then((data)=> {
    // utilize the data
    console.log(data);
    const all_blogs = document.getElementById("all_blogs")
    
    data.map((element)=>{
       all_blogs.innerHTML += `<div  id="card">
         <img onclick="displaySingleBlog(${element.id})" src="${element.image}"
         <h6>${element.title}</h6>
         <button onclick="deleteBlog(${element.id})" id="deleteBtn">Delete</button>
       </div>`

    })


})


// display single blog
function displaySingleBlog(id)
{
    fetch(`http://localhost:3000/blogs/${id}`, {
    method:"GET"
    })
    .then((response)=> response.json())
    .then((data)=> {
        const single_blog= document.getElementById("single_blog")
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
    fetch(`http://localhost:3000/blogs/${id}`, {
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

    fetch(`http://localhost:3000/blogs`, {
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