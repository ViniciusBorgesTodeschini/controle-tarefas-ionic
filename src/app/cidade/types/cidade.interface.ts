import { EstadoEnum } from './estado.enum';

export interface CidadeInterface {
  id?: number | null;
  nome: string;
  estado: EstadoEnum;
}
