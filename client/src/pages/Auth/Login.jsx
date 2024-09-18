import AuthForm from "../../components/Common/AuthForm";
import useLogin from "../../hooks/auth/useLogin";

const Login = () => {
  const { login, loading } = useLogin();

  const fields = [
    {
      label: "Identifier",
      name: "identifier",
      type: "text",
      validation: { required: "Email or Username is required" },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      validation: { required: "Password is required" },
    },
  ];

  const onSubmit = async (data, reset) => {
    await login(data, reset);
  };

  return (
    <AuthForm
      title="Login"
      fields={fields}
      onSubmit={onSubmit}
      buttonLabel="Login"
      loading={loading}
    />
  );
};

export default Login;
