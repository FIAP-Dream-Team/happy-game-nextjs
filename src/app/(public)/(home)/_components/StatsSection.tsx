import { H2, Paragraph, Span } from "@/components/ui/Typography";

export function StatsSection() {
  return (
    <section className="py-20 bg-bg-secondary">
      <div className="p-4 max-w-[1344px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <H2>Estatísticas Impactantes da Indústria de Jogos</H2>
            <Paragraph variant="text1">
              A indústria de jogos movimenta bilhões de reais anualmente,
              atraindo milhões de jogadores. Com o crescimento das plataformas
              sociais, a conexão entre gamers nunca foi tão evidente.
            </Paragraph>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div className="space-y-2 p-8 bg-surface-primary rounded-2xl border border-neutral-700 hover:border-primary-green-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-green-base/20 group cursor-pointer">
              <Span variant="display3" className="text-text-surface-primary">
                75%
              </Span>
              <Paragraph className="text-text-surface-primary">
                dos jogadores buscam comunidades online para interagir
              </Paragraph>
            </div>
            <div className="space-y-2 p-8 bg-surface-primary rounded-2xl border border-neutral-700 hover:border-primary-green-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-green-base/20 group cursor-pointer">
              <Span variant="display3" className="text-text-surface-primary">
                80%
              </Span>
              <Paragraph className="text-text-surface-primary">
                dos jogos são adquiridos através de recomendações
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
