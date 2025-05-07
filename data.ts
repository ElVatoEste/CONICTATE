export interface Job {
  id: number;
  title: string;
  image: string;
  salary: string;
  location: string;
  jobtype: string;
}

const JobData: Job[] = [
  {
    id: 1,
    title: "Panadero",
    image: "/images/c1.png",
    salary: "C$8k - C$10k",
    location: "Managua",
    jobtype: "Full time",
  },
  {
    id: 2,
    title: "Auxiliar Contable",
    image: "/images/c2.png",
    salary: "C$12k - C$15k",
    location: "León",
    jobtype: "Mid time",
  },
  {
    id: 3,
    title: "Enfermera Registrada",
    image: "/images/c3.png",
    salary: "C$15k - C$18k",
    location: "Masaya",
    jobtype: "Full time",
  },
  {
    id: 4,
    title: "Profesor de Inglés",
    image: "/images/c4.png",
    salary: "C$10k - C$12k",
    location: "Granada",
    jobtype: "Mid Time",
  },
  {
    id: 5,
    title: "Conductor de Rutas Urbanas",
    image: "/images/c5.png",
    salary: "C$8k - C$10k",
    location: "Chinandega",
    jobtype: "Full time",
  },
  {
    id: 6,
    title: "Diseñador Gráfico",
    image: "/images/c6.png",
    salary: "C$20k - C$25k",
    location: "Estelí",
    jobtype: "Freelance",
  },
];

export default JobData;
