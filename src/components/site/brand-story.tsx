export function BrandStory() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid gap-8 py-16 md:grid-cols-3 md:py-20">
        <div className="md:col-span-1">
          <p className="eyebrow mb-3">Nossa essência</p>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">
            <span className="text-metallic">Elegância que fixa</span>
          </h2>
        </div>
        <div className="grid gap-8 md:col-span-2 md:grid-cols-2">
          <Pillar
            title="Seleção criteriosa"
            text="Cada fragrância é escolhida pela qualidade da matéria-prima, fixação e projeção. Nada entra no catálogo sem passar pelo nosso padrão."
          />
          <Pillar
            title="Alta fixação"
            text="Concentrações generosas para que o seu perfume acompanhe o dia inteiro — da manhã à noite, com personalidade."
          />
          <Pillar
            title="Atendimento próximo"
            text="Recomendação personalizada pelo WhatsApp. Conte o que você gosta e indicamos a fragrância certa para você."
          />
          <Pillar
            title="Entrega para todo o Brasil"
            text="Envio cuidadoso e rápido, com frete grátis acima de R$ 199 e trocas facilitadas em até 7 dias."
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({ title, text }: { title: string; text: string }) {
  return (
    <div className="space-y-2">
      <div className="hairline w-10" />
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
