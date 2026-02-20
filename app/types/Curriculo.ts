import mongoose from 'mongoose';

const CurriculoSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true }, 
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
  },
  experiences: [{
  position: String,
  company: String,

  startMonth: String,
  startYear: String,

  endMonth: String,
  endYear: String,

  current: Boolean,

  description: String,
}],

  education: [{
    degree: String,
    institution: String,
    startYear: String,
    endYear: String,
  }],
  skills: [String],
  languages: [{
    name: String,
    level: String,
  }],
  updatedAt: { type: Date, default: Date.now },
});

// Esta linha é crucial para o Next.js não tentar recriar o modelo toda vez que o código atualizar
export default mongoose.models.Curriculo || mongoose.model('Curriculo', CurriculoSchema);