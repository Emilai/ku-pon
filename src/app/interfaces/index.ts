export interface Kupon {
    id: string;
    categoria: string;
    comercio: string;
    titulo: string;
    descripcion: string;
    condiciones: string;
    img: string;
    key: string;
    precio: number;
    valor: number;
    premium: boolean;
}

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    img: string;
    premium: boolean;
    admin: boolean;
    superadmin: boolean;
}
