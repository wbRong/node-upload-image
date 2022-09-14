let formData = new FormData()
document.querySelector(".file").addEventListener("change", function (e) {
  let files = e.target.files
  files.length && formData.append("file", files[0], files[0].name)
})

function send() {
  axios.post("http://localhost:3000/upload", formData, {
    Headers: { "Content-type": "multipart/form-data" },
  }).then( res => {
    const { url } = res.data
    document.querySelector("#imgs").src = url
  })
}