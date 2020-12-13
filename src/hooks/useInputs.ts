import { useState, useCallback } from 'react';

function useInputs(initialForm: {
  username: string;
  email: string;
}): [
  { username: string; email: string },
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
] {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

export default useInputs;
