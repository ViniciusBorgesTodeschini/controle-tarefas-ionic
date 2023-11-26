import { CidadeInterface } from "src/app/cidade/types/cidade.interface";
import { TipoPessoaEnum } from "./tipo-pessoa.enum";
import { DepartamentoInterface } from "src/app/departamento/types/departamento.interface";

export interface PessoaInterface {
  id?: number | null;
  nome: string;
  tipo: TipoPessoaEnum;
  documento: string;
  endereco: string;
  telefone: string;
  cidade: CidadeInterface;
  ativo: boolean;
  cliente: boolean;
  departamento: DepartamentoInterface | null;
  pessoa: PessoaInterface | null;
}
