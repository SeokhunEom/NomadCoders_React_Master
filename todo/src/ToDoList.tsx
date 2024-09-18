import { useForm } from "react-hook-form";

interface Form {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Form>({
    defaultValues: {
      email: "@naver.com",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      password1: "",
    },
  });
  const onValid = (data: Form) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        {
          message: "password are not the same",
        },
        { shouldFocus: true }
      );
    }
    // setError("extraError", {
    //   message: "Server offline",
    // });
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "invalid email address",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("first_name", {
            required: "Write here",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowd" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowd" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors.first_name?.message}</span>
        <input
          {...register("last_name", { required: "Write here" })}
          placeholder="Last Name"
        />
        <span>{errors.last_name?.message}</span>
        <input
          {...register("username", { required: "Write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors.username?.message}</span>
        <input
          {...register("password", { required: "Write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password should be longer than 5 chars",
            },
          })}
          placeholder="Password 1"
        />
        <span>{errors.password1?.message}</span>
        <button>Add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ToDoList;
