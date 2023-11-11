export interface AtendimentoInterface {
  id?: number | null;
  detalhes: string;
  inicioAtendimento: Date;
  fimAtendimento: Date;
  assunto: [];
  meio: [];
  solicitante: [];
  atendente: [];
}
