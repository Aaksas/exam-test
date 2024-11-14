export interface Exam {
  id: number;
  student: {
    first_name: string;
    last_name: string;
  };
  meeting_point?: string; // Optional, defaults to "En attente" if not provided
  date?: string; // Optional, could be formatted as 'yyyy-MM-dd'
  time?: string; // Optional, could default to "En attente" if not provided
  status: 'Confirmé' | 'À organiser' | 'Annulé' | 'Recherche de place'; // Limited to specific status strings
}
