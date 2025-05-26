import { CreateJobForm } from '@/components/Job/CreateJobForm';

const NewJobPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#05264e]">Crear nuevo trabajo</h1>
      <CreateJobForm />
    </div>
  );
};

export default NewJobPage;
