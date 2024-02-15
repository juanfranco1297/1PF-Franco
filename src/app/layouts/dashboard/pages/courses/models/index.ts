export interface Courses {
    id: number,
    nombre: string,
    horarios: string,
    id_profesor: number,
    profesor: any
}

export interface Inscripciones {
    id_inscripcion: number,
    id_estudiante: number,
    id_curso: number,
    fecha: string
}