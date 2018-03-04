let token = null

const blogs = [
    {
      id: "5a451df7571c224a31b5c8ce",
      title: "HTML on helppoa",
      author: "Kaikkonen",
      likes: 2,
      user: {
        _id: "5a437a9e514ab7f168ddf138",
        username: "mluukkai",
        name: "Matti Luukkainen"
      }
    },
    {
      id: "5a451e21e0b8b04a45638211",
      title: "HTML on paskaa",
      author: "Kekkonen",
      likes: 1,
      user: {
        _id: "5a437a9e514ab7f168ddf138",
        username: "mluukkai",
        name: "Matti Luukkainen"
      }
    },
    {
      id: "5a451e30b5ffd44a58fa79ab",
      title: "mikä vitun HLTM",
      author: "Leinonen",
      likes: 1,
      user: {
        _id: "5a437a9e514ab7f168ddf138",
        username: "mluukkai",
        name: "Matti Luukkainen"
      }
    }
  ]

const getAll = () => {
    return Promise.resolve(blogs)
  }
  
  export default { getAll, blogs }