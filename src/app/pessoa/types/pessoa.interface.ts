import { TipoPessoaEnum } from "./tipo-pessoa.enum";

export interface PessoaInterface {
  id?: number | null;
  nome: string;
  tipo: TipoPessoaEnum;
  documento: string;
  endereco: string;
  telefone: string;
  cidade: [];
  ativo: boolean;
  cliente: boolean;
  departamento: [] | null;
  pessoa: [] | null;
}
