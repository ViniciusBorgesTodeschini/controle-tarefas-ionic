export interface UsuarioInterface {
  id?: number | null;
  nome: string;
  pessoa: [];
  dataCadastro: Date;
  dataAtualizacao: Date;
  dataUltimoAcesso: Date;
  ativo: boolean;
  administrador: boolean;  
}