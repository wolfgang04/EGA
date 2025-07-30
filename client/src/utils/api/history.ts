import axios from "axios";
import SERVER from "../../SERVER";
import { Histories } from "../../models/History.model";
import { Dayjs } from "dayjs";

type PickerMode = "date" | "week" | "month" | "year" | undefined;

export const fetchHistory = async (
  page: string,
  search: string,
  date: Dayjs | null,
  dateOption: PickerMode,
  sort: string,
): Promise<{ count: number; rows: Histories }> => {
  const { data } = await axios.get<{ count: number; rows: Histories }>(
    `${SERVER}/request/requests`,
    {
      withCredentials: true,
      params: {
        page,
        filter: search,
        date: date?.format("YYYY-MM-DD"),
        dateType: date && dateOption === undefined ? "date" : dateOption,
        sort: sort.toUpperCase(),
      },
    },
  );

  return data;
};
