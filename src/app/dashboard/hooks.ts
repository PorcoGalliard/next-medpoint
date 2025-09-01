import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/actions/locale';
import Functions from '@/lib/raiden/functions';
import { SelectChangeEvent } from '@mui/material/Select';

export const useDashboard = () => {

  const callFunction = async () => {
    try {
      await Functions.post('hello', { name: 'World' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value: SelectChangeEvent) => {
    const locale = value.target.value as Locale;
    setUserLocale(locale);
  };

  return {
    callFunction,
    handleChange,
  };
};
