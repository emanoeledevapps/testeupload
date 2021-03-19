const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
    aluno: String,
    professor: String
})

module.exports = mongoose.model("Alunos", alunoSchema)