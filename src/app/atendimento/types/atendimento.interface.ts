import { PessoaInterface } from "src/app/pessoa/types/pessoa.interface";
import { AtendimentoAssuntoInterface } from "../atendimento-assunto/types/atendimento-assunto.interface";
import { AtendimentoMeioInterface } from "../atendimento-meio/types/atendimento-meio.interface";
import { UsuarioInterface } from "src/app/usuario/types/usuario.interface";

export interface AtendimentoInterface {
  id?: number | null;
  detalhes: string;
  assunto: AtendimentoAssuntoInterface;
  inicioAtendimento: Date;
  fimAtendimento: Date;
  meio: AtendimentoMeioInterface;
  solicitante: PessoaInterface;
  usuario: UsuarioInterface;
}
