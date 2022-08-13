import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import { seoulTimezone } from "./configs";

dayjs.extend(timezone)

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
}

export const getUpcomingResultDay = () => {
  return dayjs().tz(seoulTimezone).day(6).hour(18).startOf('hour');
}