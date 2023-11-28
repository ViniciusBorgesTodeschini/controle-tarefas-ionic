import { PessoaInterface } from "src/app/pessoa/types/pessoa.interface";

export interface UsuarioInterface {
  id?: number | null;
  nome: string;
  pessoa: PessoaInterface;
  email: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
  dataUltimoAcesso: Date;
  ativo: boolean;
  administrador: boolean;  
}