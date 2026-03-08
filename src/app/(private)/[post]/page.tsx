import { MarkdownRenderer } from "@privateComponents/MarkdownRenderer";

export default function PostPage() {
  const post = `
  ## O Novo Capítulo do Horror

  A franquia Resident Evil continua expandindo seu universo sombrio, e Resident Evil Requiem surge como um dos títulos mais comentados entre os fãs de survival horror. Mantendo a essência clássica da série — tensão constante, escassez de recursos e narrativa envolvente — o jogo aposta em uma atmosfera ainda mais densa e psicológica.

  ### Retorno às Raízes

  Inspirado no clima claustrofóbico de títulos como Resident Evil 7: Biohazard e Resident Evil 2, Requiem foca na exploração estratégica e no medo do desconhecido. Corredores escuros, trilhas sonoras minimalistas e encontros imprevisíveis reforçam a sensação de vulnerabilidade — algo que os fãs veteranos valorizam muito.

  ### História e Ambientação

  A narrativa gira em torno de um novo surto biológico, conectando eventos passados da franquia com novos personagens. Referências sutis a organizações como a Umbrella Corporation ajudam a amarrar o enredo ao universo já conhecido, enquanto expandem os mistérios sobre experimentos genéticos e conspirações corporativas.
  `;

  return (
    <article>
      <MarkdownRenderer content={post} />
    </article>
  );
}
