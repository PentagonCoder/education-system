import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useAuth } from "../../hooks/useAuth";

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin, loading, error } = useAuth();

  if(loading) {
    return <span>Logging in...</span>
  }
  
  if(error) {
    return <span>{error}</span>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <input
              type="email"
              className="w-full border rounded-lg p-3"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <span>Email is required</span>}
            <br />
            <input
              type="password"
              className="w-full border rounded-lg p-3"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <span>Password is required</span>}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
      </div>
    </div>
  );
}

export default Login;