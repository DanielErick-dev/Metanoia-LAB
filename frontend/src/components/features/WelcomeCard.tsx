export function WelcomeCard() {
  return (
    <div className="p-8 rounded-xl border border-stone-200 bg-white shadow-sm max-w-md">
      <h2 className="text-2xl font-semibold text-stone-900">
        Bem-vindo ao Metanoia Lab
      </h2>
      <p className="mt-2 text-stone-600 leading-relaxed">
        Este é o seu laboratório de transformação mental. 
        A arquitetura está pronta para receber seus estudos de Romanos e Epicteto.
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Ambiente Frontend: Online
      </div>
    </div>
  );
}