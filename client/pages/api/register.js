import { api } from "../../utils/api";

export default async (req, res) => {
  try {
    const response = await api().post("/auth/register", req.body);

    res.status(200).json(response.data);
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json(response.data)
      : res.status(400).json({ message: error.message });
  }
};
