export interface Kupon {
    id: string;
    categoria: string;
    comercio: string;
    comercioCode: string;
    whatsapp?: string;
    instagram?: string;
    location?: string;
    web?: string;
    titulo: string;
    descripcion: string;
    condiciones: string;
    normalprice: string;
    discountprice: string;
    img: string;
    extras?: string[];
    key: string;
    precio: number;
    valor: string;
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
    code: string;
    grupos: string[];
    premium: boolean;
    admin: boolean;
    superadmin: boolean;
}
