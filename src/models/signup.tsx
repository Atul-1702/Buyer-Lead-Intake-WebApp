export default interface SignupModel {
  userid: string;
  email: string;
  password: string;
  ["confirm-password"]?: string;
}
