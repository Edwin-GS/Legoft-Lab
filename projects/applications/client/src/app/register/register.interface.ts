export interface RegisterForm {
  user: {
    value: string;
    required: boolean;
    minLength: number;
    maxLength: number;
  };
  email: {
    value: string;
    required: boolean;
    minLength: number;
    maxLength: number;
  };
  password: {
    value: string;
    required: boolean;
    description: string;
  };
}
