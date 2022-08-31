export interface Kupon {
    id: string;
    categoria: string;
    comercio: string;
    whatsapp?: string;
    instagram?: string;
    location?: string;
    titulo: string;
    descripcion: string;
    condiciones: string;
    img: string;
    key: string;
    precio: number;
    valor: number;
    premium: boolean;
    code: string;
}

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    tel: number;
    img: string;
    empresa: string;
    premium: boolean;
    admin: boolean;
    superadmin: boolean;
}
