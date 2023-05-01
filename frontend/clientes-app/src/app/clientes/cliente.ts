import { Factura } from '../facturas/models/factura';
import { Region } from './region';

export class Cliente {
  id!: number;
  nombre!: string;
  apellido!: string;
  fecha!: string;
  email!: string;
  foto!: string;
  region!: Region;
  facturas: Factura[] = [];
}
