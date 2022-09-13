function send () {
  axios.post('http://localhost:3000/upload', formData, {
    Headers: { "Content-type": "multipart/form-data" }
  }).then(res => {
    const { url } = res.data
    document.querySelector('#imgs').src = url
  })
}