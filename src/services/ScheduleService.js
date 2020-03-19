import database from "../models";

class ScheduleService {
  static async addSchedule(newSchedule, next) {
    const {
      uuid,
      title,
      recipients,
      sender,
      message,
      time,
      status,
      id
    } = newSchedule;

    try {
      return await database.Schedule.create({
        uuid,
        title,
        phone: recipients,
        sender,
        message,
        time,
        status,
        userId: id
      });
    } catch (error) {
      throw error;
    }
    next();
  }
}

export default ScheduleService;
