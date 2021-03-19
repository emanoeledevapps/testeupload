const mongoose = require("mongoose");

const semanasSchema = new mongoose.Schema({
    semana: String
})

module.exports = mongoose.model("Semanas", semanasSchema);