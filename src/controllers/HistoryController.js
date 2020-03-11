import HistoryService from "../services/HistoryService";

class HistoryController {
  static async GetHistory(req, res) {
    const { id } = req.user;
    try {
      const history = await HistoryService.getHistory(id);
      if (!history) {
        return res.status(400).send({
          status: 400,
          message: "Please login to check yourBalance"
        });
      }

      return res.status(200).send({
        status: 200,
        message: "Your History",
        data: history
      });
    } catch (error) {}
  }
}

export default HistoryController;
