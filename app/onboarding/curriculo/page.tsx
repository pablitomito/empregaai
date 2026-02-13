"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent, KeyboardEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { PersonalInfo, Experience, Education, Language, CVData } from '../../types/cv.types';
import styles from '../../styles/CriarCurriculo.module.css';
import { useSession } from 'next-auth/react'; // Se usar NextAuth


const CriarCurriculo: NextPage = () => {
  const router = useRouter();
  // States
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [skillInput, setSkillInput] = useState('');

  // Collapsed sections state
  const [collapsedSections, setCollapsedSections] = useState<{[key: string]: boolean}>({});

  // ID counters
  const [nextExpId, setNextExpId] = useState(0);
  const [nextEduId, setNextEduId] = useState(0);
  const [nextLangId, setNextLangId] = useState(0);

  // Toggle section collapse
  const toggleSection = (sectionName: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Personal Info handlers
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: nextExpId,
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    };
    setExperiences(prev => [...prev, newExp]);
    setNextExpId(prev => prev + 1);
  };

  const updateExperience = (id: number, field: keyof Experience, value: any) => {
    setExperiences(prev => prev.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: number) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const toggleCurrentJob = (id: number) => {
    setExperiences(prev => prev.map(exp =>
      exp.id === id ? { ...exp, isCurrent: !exp.isCurrent, endDate: exp.isCurrent ? '' : 'Atual' } : exp
    ));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: nextEduId,
      degree: '',
      institution: '',
      startYear: '',
      endYear: ''
    };
    setEducation(prev => [...prev, newEdu]);
    setNextEduId(prev => prev + 1);
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setEducation(prev => prev.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: number) => {
    setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  // Skills handlers
  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleSkillKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  // Language handlers
  const addLanguage = () => {
    const newLang: Language = {
      id: nextLangId,
      name: '',
      level: 'Básico'
    };
    setLanguages(prev => [...prev, newLang]);
    setNextLangId(prev => prev + 1);
  };

  const updateLanguage = (id: number, field: keyof Language, value: any) => {
    setLanguages(prev => prev.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id: number) => {
    setLanguages(prev => prev.filter(lang => lang.id !== id));
  };

const handleGenerateCV = async (e: any) => {
  if (e && e.preventDefault) e.preventDefault();

  // 1. Criamos um objeto limpo com o email no topo
  const payload = {
    email: personalInfo.email, // O servidor quer email? Toma o email.
    fullName: personalInfo.fullName,
    location: personalInfo.location,
    phone: personalInfo.phone,
    summary: personalInfo.summary,
    experiences: experiences,
    education: education,
    skills: skills,
    languages: languages
  };

  console.log("🚀 Enviando para o servidor:", payload);

  try {
    const response = await fetch('/api/auth/curriculo', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/onboarding/analisando');
    } else {
      console.error("❌ Erro retornado:", data);
      // Se o erro persistir, vamos mostrar o que o servidor recebeu de fato
      alert(`O servidor diz: ${data.error || data.message || JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error("🔥 Erro na conexão:", error);
    alert("Erro de conexão. O servidor está rodando?");
  }
};
  return (
    <>
      <Head>
        <title>Criar Currículo - CurriculoJob</title>
        <meta name="description" content="Crie seu currículo profissional com IA" />
      </Head>

      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.pageHeader}>
          <h1>Criar Novo Currículo</h1>
          <p>Preencha as informações abaixo para gerar seu currículo profissional otimizado com IA</p>
        </div>

        <form onSubmit={handleGenerateCV}>
          {/* SECTION 1: DADOS PESSOAIS */}
          <div className={`${styles.sectionCard} ${collapsedSections['personal'] ? styles.collapsed : ''}`}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('personal')}>
              <div className={styles.sectionHeaderLeft}>
                <div className={`${styles.sectionIcon} ${styles.blue}`}>
                  <span>👤</span>
                </div>
                <div>
                  <span className={styles.sectionTitle}>Dados Pessoais</span>
                </div>
              </div>
              <div className={styles.sectionActions}>
                <span className={styles.toggleIcon}>▼</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              <div className={styles.formGroup}>
                <label>Nome Completo</label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Telefone</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    placeholder="+00 0000-0000"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Localização</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    placeholder="Cidade, Estado"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Resumo Profissional</label>
                <textarea
                  value={personalInfo.summary}
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                  placeholder="Breve resumo sobre você..."
                  required
                />
                <p className={styles.hintText}>Dica: Conte um pouco sobre sua trajetória e o que você resolve</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: EXPERIÊNCIAS */}
          <div className={`${styles.sectionCard} ${collapsedSections['exp'] ? styles.collapsed : ''}`}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('exp')}>
              <div className={styles.sectionHeaderLeft}>
                <div className={`${styles.sectionIcon} ${styles.blue}`}>
                  <span>💼</span>
                </div>
                <div>
                  <span className={styles.sectionTitle}>Experiências</span>
                  <span className={styles.sectionCount}>{experiences.length}</span>
                </div>
              </div>
              <div className={styles.sectionActions}>
                <button
                  type="button"
                  className={styles.btnAdd}
                  onClick={(e) => {
                    e.stopPropagation();
                    addExperience();
                  }}
                >
                  <span>+</span>
                  <span>Adicionar</span>
                </button>
                <span className={styles.toggleIcon}>▼</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              {experiences.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Nenhuma experiência adicionada ainda.</p>
                </div>
              ) : (
                experiences.map((exp) => (
                  <div key={exp.id} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <div>
                        <div className={styles.itemTitle}>
                          {exp.position || 'Cargo não definido'}
                        </div>
                        <div className={styles.itemSubtitle}>
                          {exp.company || 'Instituição'}
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.btnRemove}
                        onClick={() => removeExperience(exp.id)}
                      >
                        🗑️ Remover
                      </button>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Cargo</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          placeholder="Ex: Gestor de Vendas"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Empresa</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Ex: Hotel XYZ"
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Data Início (Mês/Ano)</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          placeholder="01/2020"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Data Fim (Mês/Ano)</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          placeholder="12/2023"
                          disabled={exp.isCurrent}
                        />
                        <div className={styles.checkboxGroup}>
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.isCurrent}
                            onChange={() => toggleCurrentJob(exp.id)}
                          />
                          <label htmlFor={`current-${exp.id}`}>Atual</label>
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Descreva suas principais responsabilidades e conquistas</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Ex: 'Aumentei as vendas em 20% implementando...'"
                        required
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECTION 3: FORMAÇÃO ACADÉMICA */}
          <div className={`${styles.sectionCard} ${collapsedSections['edu'] ? styles.collapsed : ''}`}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('edu')}>
              <div className={styles.sectionHeaderLeft}>
                <div className={`${styles.sectionIcon} ${styles.purple}`}>
                  <span>🎓</span>
                </div>
                <div>
                  <span className={styles.sectionTitle}>Formação Académica</span>
                  <span className={styles.sectionCount}>{education.length}</span>
                </div>
              </div>
              <div className={styles.sectionActions}>
                <button
                  type="button"
                  className={styles.btnAdd}
                  onClick={(e) => {
                    e.stopPropagation();
                    addEducation();
                  }}
                >
                  <span>+</span>
                  <span>Adicionar</span>
                </button>
                <span className={styles.toggleIcon}>▼</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              {education.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Nenhuma formação adicionada ainda.</p>
                </div>
              ) : (
                education.map((edu) => (
                  <div key={edu.id} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <div>
                        <div className={styles.itemTitle}>
                          {edu.degree || 'Curso não definido'}
                        </div>
                        <div className={styles.itemSubtitle}>
                          {edu.institution || 'Instituição'}
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.btnRemove}
                        onClick={() => removeEducation(edu.id)}
                      >
                        🗑️ Remover
                      </button>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Grau/Curso</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="Ex: Licenciatura em..."
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Instituição</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="Ex: Universidade..."
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Data Início (Ano)</label>
                        <input
                          type="text"
                          value={edu.startYear}
                          onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                          placeholder="2018"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Data Fim (Ano)</label>
                        <input
                          type="text"
                          value={edu.endYear}
                          onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                          placeholder="2022"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECTION 4: HABILIDADES */}
          <div className={`${styles.sectionCard} ${collapsedSections['skills'] ? styles.collapsed : ''}`}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('skills')}>
              <div className={styles.sectionHeaderLeft}>
                <div className={`${styles.sectionIcon} ${styles.yellow}`}>
                  <span>💡</span>
                </div>
                <div>
                  <span className={styles.sectionTitle}>Habilidades</span>
                  <span className={styles.sectionCount}>{skills.length}</span>
                </div>
              </div>
              <div className={styles.sectionActions}>
                <span className={styles.toggleIcon}>▼</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              <div className={styles.formGroup}>
                <div className={styles.addSkillGroup}>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillKeyPress}
                    placeholder="Adicionar nova habilidade"
                  />
                  <button type="button" onClick={addSkill}>+</button>
                </div>
                <div className={styles.tagsContainer}>
                  {skills.map((skill, index) => (
                    <div key={index} className={styles.tag}>
                      {skill}
                      <button
                        type="button"
                        className={styles.tagRemove}
                        onClick={() => removeSkill(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <p className={styles.hintText}>
                  Adicione suas principais competências técnicas e comportamentais
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 5: IDIOMAS */}
          <div className={`${styles.sectionCard} ${collapsedSections['lang'] ? styles.collapsed : ''}`}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('lang')}>
              <div className={styles.sectionHeaderLeft}>
                <div className={`${styles.sectionIcon} ${styles.pink}`}>
                  <span>🌐</span>
                </div>
                <div>
                  <span className={styles.sectionTitle}>Idiomas</span>
                  <span className={styles.sectionCount}>{languages.length}</span>
                </div>
              </div>
              <div className={styles.sectionActions}>
                <button
                  type="button"
                  className={styles.btnAdd}
                  onClick={(e) => {
                    e.stopPropagation();
                    addLanguage();
                  }}
                >
                  <span>+</span>
                  <span>Adicionar</span>
                </button>
                <span className={styles.toggleIcon}>▼</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              {languages.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Nenhum idioma adicionado ainda.</p>
                </div>
              ) : (
                languages.map((lang) => (
                  <div key={lang.id} className={styles.languageItem}>
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                      placeholder="Português"
                      required
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(lang.id, 'level', e.target.value as any)}
                      required
                    >
                      <option value="Básico">Básico</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                      <option value="Fluente">Fluente</option>
                      <option value="Nativo">Nativo</option>
                    </select>
                    <button
                      type="button"
                      className={styles.btnRemove}
                      onClick={() => removeLanguage(lang.id)}
                    >
                      🗑️ Remover
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* FOOTER CTA */}
          <div className={styles.footerCta}>
            <button type="submit" className={styles.btnGenerate}>
              GERAR MEU CURRÍCULO
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CriarCurriculo;
