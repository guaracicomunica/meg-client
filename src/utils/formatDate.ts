import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  const today = Date.now();

  const datePostString = format(parseISO(date), 'd/M/u');
  const dateTodayString = format(today, 'd/M/u');

  if (datePostString === dateTodayString) {
    return format(parseISO(date), "HH:mm");
  }
  else {
    return format(parseISO(date), "d 'de' MMMM", {locale: ptBR});
  }
}