export interface SupportRequestDTO {
    id: string
    number_needed: number
    current_number_of_volunteers: number
    skills_required: string
    description: string
    shift: {
        id: string
        start_time: string
        end_time: string
        date: string
        department: string
    }
}
