import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Seoul')

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
}

export const getUpcomingResultDay = () => {
  return dayjs().day(6).hour(18).startOf('hour');
}

export const parseDate = (dateString: string) => {
  return dayjs(dateString)
}

export const sleep = async (timeMillis) => {
  return new Promise((resolve) => setTimeout(resolve, timeMillis));
}