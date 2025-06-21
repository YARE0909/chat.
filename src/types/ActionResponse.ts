export default interface ActionResponse<T = any> {
  status: "success" | "failure";
  message: string;
  data?: T | null;
}
