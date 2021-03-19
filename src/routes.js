const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");
const Alunos = require("./models/CadastraAluno");
const Semanas = require("./models/CadastraSemana");

routes.get("/posts/:professor/:aluno/:semana", async (req, res) => {
  const {professor, aluno, semana} = req.params;

  const filter = {
    professor: professor,
    aluno: aluno,
    semana: semana
  }
  const posts = await Post.find(filter);

  return res.json(posts);
});

routes.get("/alunos/:professor", async (req, res) => {
  const {professor} = req.params;

  const filter = {
    professor
  }

  const alunos = await Alunos.find(filter);

  return res.json(alunos)
});

routes.get("/semanas", async (req, res) => {
  const semanas = await Semanas.find()

  return res.json(semanas)
})

routes.post("/posts/:professor/:aluno/:semana", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;
  const {professor, aluno, semana} = req.params;

  const post = await Post.create({
    name,
    size,
    key,
    professor,
    aluno,
    semana,
    url
  });

  return res.json(post);
});

routes.post("/cadastroaluno/:aluno/:professor", async (req, res) => {
  const {aluno, professor} = req.params;

  const cadastro = await Alunos.create({
    aluno,
    professor
  })

  return res.json(cadastro)
});

routes.post("/cadastrosemana/:semana", async (req,res) => {
  const {semana} = req.params;

  const cadastro = await Semanas.create({
    semana
  })

  return res.json(cadastro)
})

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

module.exports = routes;
