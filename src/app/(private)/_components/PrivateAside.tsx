"use client";

import { AsideBlock } from "@privateComponents/AsideBlock";
import { PostItemSmall } from "@privateComponents/PostItemSmall";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Paragraph } from "@/components/ui/Typography";

export function PrivateAside() {
  return (
    <aside className="w-1/3 max-w-[400px] shrink-0 flex-col gap-10 hidden md:flex">
      <AsideBlock icon="Gamepad2" title="Personalize sua pesquisa">
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <Paragraph className="text-text-primary">Título</Paragraph>
            <Input
              variant="filled"
              size="medium"
              placeholder="Procure pelo título do jogo"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <Paragraph className="text-text-primary">Gênero</Paragraph>
            <Select>
              <SelectTrigger size="medium" className="bg-bg-secondary">
                <SelectValue placeholder="Selecione o gênero do jogo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acao">Ação</SelectItem>
                <SelectItem value="rpg">RPG</SelectItem>
                <SelectItem value="aventura">Aventura</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <label className="flex flex-col gap-1.5">
            <Paragraph className="text-text-primary">Plataforma</Paragraph>
            <Select>
              <SelectTrigger size="medium" className="bg-bg-secondary">
                <SelectValue placeholder="Selecione a plataforma do jogo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pc">PC</SelectItem>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="switch">Nintendo Switch</SelectItem>
              </SelectContent>
            </Select>
          </label>
        </div>
      </AsideBlock>

      <AsideBlock icon="Users" title="O que seus amigos estão fazendo">
        <ul className="flex flex-col gap-2">
          <li>
            <PostItemSmall
              title="Resident Evil requiem é o melhor jogo de 2026"
              authorName="Technomancer"
              dateAndComments="05 Mar - 13 Comentários"
              href="/feed/1"
            />
          </li>
          <li>
            <PostItemSmall
              title="Novos jogos indie para acompanhar em 2026"
              authorName="GamerFan"
              dateAndComments="04 Mar - 8 Comentários"
              badges={["Dicas"]}
              href="/feed/2"
            />
          </li>
          <li>
            <PostItemSmall
              title="Dicas para platinar Elden Ring"
              authorName="SoulsPlayer"
              dateAndComments="03 Mar - 22 Comentários"
              badges={["Dicas", "Guia"]}
              href="/feed/3"
            />
          </li>
        </ul>
      </AsideBlock>
    </aside>
  );
}
