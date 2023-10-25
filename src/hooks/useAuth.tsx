import { useEffect } from "react";
import useSWR from "swr";
import { axiosClient } from "../config";
import { useNavigate } from "react-router-dom";

interface Props {
  middleware?: string;
  url?: string;
}

interface LoginInterface {
  email: string;
  password: string;
}

interface SignupInterface {
  name: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  password: string;
  // password_confirmation: string;
}

export const useAuth = ({ middleware, url }: Props) => {
  const navigate = useNavigate();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/user", () =>
    axiosClient("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error("useSWR Error:" + error?.response?.data?.errors);
      })
  );

  const login = async (
    loginUserData: LoginInterface,
    setErrorMessages: React.Dispatch<React.SetStateAction<never[]>>
  ) => {
    try {
      const { data } = await axiosClient.post("/login", loginUserData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Credentials": true,
        },
      });
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrorMessages([]);
      await mutate();
      // navigate("/");
    } catch (error: any) {
      setErrorMessages(Object.values(error.response.data.errors));
    }
  };

  const signup = async (
    newUser: SignupInterface,
    setErrorMessages: React.Dispatch<React.SetStateAction<never[]>>
  ) => {
    try {
      const { data } = await axiosClient.post("/register", newUser, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Credentials": true,
        },
      });
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrorMessages([]);
      await mutate();
      // navigate("/");
    } catch (error: any) {
      setErrorMessages(Object.values(error.response.data.errors));
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Credentials": true,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/login");
      await mutate(undefined);
    } catch (error: any) {
      throw Error(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }

    if (middleware === "auth" && error) {
      navigate("/login");
    }
  }, [user, error]);

  return {
    login,
    signup,
    logout,
    user,
    error,
  };
};
