import React from 'react';

interface ResumeData {
  fullName: string;
  aboutMe: string;
  email: string;
  phone: string;
  address: string;
  languages: { name: string; level: string }[];
  education: { school: string; degree: string; period: string }[];
  experience: { company: string; role: string; period: string; location: string; description: string[] }[];
  skills: string[];
  profilePic?: string;
}

const ModernEuropean = ({ data }: { data: ResumeData }) => {
  if (!data) return <div className="p-20 text-center text-slate-500 font-light italic">Sincronizando dados...</div>;

  return (
    <div className="relative w-[210mm] h-[296mm] bg-[#F8FAFC] flex overflow-hidden shadow-2xl mx-auto print:shadow-none print:m-0">
      
      {/* SIDEBAR ESQUERDA - FOCO EM IDENTIDADE E CONTATO */}
      <div className="w-[35%] bg-slate-900 text-white p-10 flex flex-col gap-12">
        
        {/* Foto de Perfil Premium */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="w-44 h-44 rounded-full border-4 border-slate-700 overflow-hidden bg-slate-800 shadow-2xl transition-transform group-hover:scale-105">
              {data.profilePic ? (
                <img src={data.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-5xl font-bold">
                  {data.fullName?.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-indigo-500 rounded-full border-[3px] border-slate-900 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">✨</span>
            </div>
          </div>
        </div>

        {/* Sobre Mim / Resumo */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase border-b border-slate-700 pb-2">Perfil</h2>
          <p className="text-[11px] leading-relaxed text-slate-300 font-light text-justify italic">
            "{data.aboutMe || "Profissional focado em resultados e desenvolvimento contínuo."}"
          </p>
        </section>

        {/* Informações de Contato */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase border-b border-slate-700 pb-2">Contato</h2>
          <div className="space-y-4 text-[11px] text-slate-300">
            <div className="flex items-start gap-3">
              <span className="bg-slate-800 p-1.5 rounded">📞</span>
              <span className="mt-1">{data.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-slate-800 p-1.5 rounded">✉️</span>
              <span className="break-all mt-1">{data.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-slate-800 p-1.5 rounded">📍</span>
              <span className="mt-1">{data.address}</span>
            </div>
          </div>
        </section>

        {/* Idiomas com Skill Bars */}
        {data.languages?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase border-b border-slate-700 pb-2">Idiomas</h2>
            <div className="space-y-4">
              {data.languages.map((lang, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-100">{lang.name}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-tighter">{lang.level}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all" 
                      style={{ width: lang.level.toLowerCase().includes('nativ') || lang.level.toLowerCase().includes('avanç') ? '100%' : '60%' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* COLUNA DIREITA - CONTEÚDO PRINCIPAL */}
      <div className="w-[65%] bg-white p-14 flex flex-col gap-12">
        
        {/* Cabeçalho Minimalista de Alto Impacto */}
        <header className="relative">
          <div className="absolute -left-14 top-1/2 w-8 h-[2px] bg-indigo-600"></div>
          <h1 className="text-[64px] font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
            {data.fullName?.split(' ')[0]} <br/>
            <span className="text-slate-300 font-light">{data.fullName?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="mt-8 flex gap-4">
            <div className="h-1 w-20 bg-indigo-600"></div>
            <div className="h-1 w-4 bg-slate-200"></div>
          </div>
        </header>

        {/* Experiências Profissionais com Timeline */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-800">Experiência</h2>
            <div className="flex-1 h-[1px] bg-slate-100"></div>
          </div>

          <div className="space-y-10">
            {data.experience?.map((exp, index) => (
              <div key={index} className="relative pl-8">
                {/* Timeline Dot & Line */}
                <div className="absolute left-0 top-1.5 w-[2px] h-[110%] bg-slate-100"></div>
                <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-indigo-600 bg-white shadow-sm"></div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-extrabold text-slate-800 leading-none">{exp.role}</h3>
                  <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>
                
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">
                  {exp.company}
                </div>

                <ul className="space-y-2.5">
                  {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((item, i) => (
                    <li key={i} className="text-[11px] text-slate-600 leading-relaxed flex gap-3">
                      <span className="text-indigo-500 font-bold mt-[-2px]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Educação e Skills em Grid */}
        <div className="grid grid-cols-2 gap-10 mt-4">
          {/* Educação */}
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 mb-6 border-b pb-2">Educação</h2>
            {data.education?.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-[11px] font-bold text-slate-800">{edu.degree}</h3>
                <p className="text-[10px] text-slate-500">{edu.school}</p>
                <p className="text-[9px] text-indigo-500 font-medium mt-1">{edu.period}</p>
              </div>
            ))}
          </section>

          {/* Competências em Pill Format */}
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 mb-6 border-b pb-2">Competências</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <span key={i} className="bg-slate-900 text-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default ModernEuropean;