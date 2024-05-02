import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({
      firstName,
      lastName,
      userName,
      phoneNumber,
      email,
      password,
      passwordConfirm,
      role,
      setOnSuccess,
    }) =>
      signupApi({
        firstName,
        lastName,
        userName,
        phoneNumber,
        email,
        password,
        passwordConfirm,
        role,
        setOnSuccess,
      }),
    // onSuccess: (user) => {
    //   console.log("Success msg", user);
    //   toast.success(
    //     "Account successfully created! Please verify the new account from the user's email address "
    //   );
    // },
    // onError: (err) => {
    //   console.log("ERROR", err);
    //   toast.error("Provided Data are not valid");
    // },
  });
  return { signup, isLoading };
}
